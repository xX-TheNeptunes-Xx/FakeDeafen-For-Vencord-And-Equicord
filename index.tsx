import definePlugin from "@utils/types";
import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";
import { findByProps } from "@webpack";
import { React } from "@webpack/common";

// 1. The Gateway function that makes the feature instantly work
// We moved this UP so the Settings menu can access it!
function refreshVoiceState(isDeaf: boolean) {
    const ChannelStore = findByProps("getChannel", "getDMFromUserId");
    const SelectedChannelStore = findByProps("getVoiceChannelId");
    const wsModule = findByProps("getSocket");
    const MediaEngineStore = findByProps("isDeaf", "isMute");

    if (!wsModule || !SelectedChannelStore || !MediaEngineStore || !ChannelStore) return;

    const socket = wsModule.getSocket();
    const channelId = SelectedChannelStore.getVoiceChannelId();
    const channel = channelId ? ChannelStore.getChannel(channelId) : null;

    if (socket && channelId) {
        try {
            // Instantly send Opcode 4 to Discord servers overriding your true status
            socket.send(4, {
                guild_id: channel?.guild_id ?? null,
                channel_id: channelId,
                self_mute: isDeaf || MediaEngineStore.isMute() || false,
                self_deaf: isDeaf || MediaEngineStore.isDeaf() || false,
                self_video: MediaEngineStore.isVideoEnabled?.() ?? false,
                flags: 0
            });
        } catch (error) {
            console.error("[FakeDeafen] Failed to update voice state:", error);
        }
    }
}

// 2. Settings
const settings = definePluginSettings({
    fakeDeaf: {
        type: OptionType.BOOLEAN,
        description: "Fake Deafen (Appear deafened but hear everyone)",
        default: false,
        restartNeeded: false,
        // THIS is the missing piece: Instantly push the update when toggled from Settings!
        onChange(newValue) {
            refreshVoiceState(newValue);
        }
    }
});

// 3. The perfectly working Chat Bar button
const FakeDeafenButton = () => {
    const [isDeaf, setIsDeaf] = React.useState(settings.store.fakeDeaf);

    const toggleDeafen = () => {
        const newValue = !isDeaf;
        settings.store.fakeDeaf = newValue;
        setIsDeaf(newValue);
        refreshVoiceState(newValue); // Instantly apply status to the server when clicked!
    };

    return (
        <div 
            style={{
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                cursor: "pointer", 
                padding: "0 8px",
                color: isDeaf ? "#f23f43" : "var(--interactive-normal)", 
                transition: "color 0.2s ease"
            }}
            onClick={toggleDeafen}
            title={isDeaf ? "Fake Deafen is ON" : "Fake Deafen is OFF"}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-4v8h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z" />
                {isDeaf && (
                    <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                )}
            </svg>
        </div>
    );
};

// 4. Plugin Definition
export default definePlugin({
    name: "FakeDeafen",
    description: "Instantly fakes your deafen status. (Personal User Plugin)",
    authors: [{ name: "00.a3", id: 0n }],
    settings,

    // Places the button back safely in the Chat Bar where it doesn't break Discord's new UI
    chatBarButton: {
        render: FakeDeafenButton
    },

    getFakeState(original: any, type: string) {
        if (settings.store.fakeDeaf && (type === "mute" || type === "deaf")) {
            return true;
        }
        return original;
    },

    patches:[
        {
            // This ensures that when you switch channels naturally, Discord maintains the fake status
            find: "}voiceStateUpdate(",
            replacement: {
                match: /self_mute:([^,]+),self_deaf:([^,]+),self_video:([^,]+)/,
                replace: "self_mute:$self.getFakeState($1, 'mute'),self_deaf:$self.getFakeState($2, 'deaf'),self_video:$3"
            }
        }
    ]
});
