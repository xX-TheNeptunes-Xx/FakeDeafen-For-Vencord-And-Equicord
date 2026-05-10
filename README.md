
# 🎧 FakeDeafen for Equicord & Vencord

## ❗disclaimer❗ 

$\color{#58a6ff}{\text{ts was vibecoded and if you find any issues just use some coding ai like the google one to fix it.}}$
$\color{#58a6ff}{\text{send it my code and describe the error and fix it.}}$


**this repo will not be maintained.**

A **User** **Plugin** for **Equicord** and **Vencord** that allows you to appear deafened (and muted) to others in a Discord voice channel, while you can still hear everything everyone is saying. 

Unlike older plugins, this uses Discord's internal WebSockets to push your fake status **instantly** to the server, meaning you never have to leave and rejoin a voice channel for the effect to apply.

## ✨ Features

- **Instant Application:** Instantly overrides your voice state using Opcode 4 payloads. No need to disconnect and reconnect!
- **Chat Bar Integration:** Adds a convenient, interactive toggle button directly to your chat bar.
- **Visual Feedback:** The chat bar icon changes dynamically (turning red with a strikethrough) when Fake Deafen is active.
- **Settings Synced:** Fully synchronized with the plugin settings menu. Toggling it from settings or the chat bar instantly updates your status.
- **Seamless Channel Switching:** Your fake deafen status persists naturally as you move between different voice channels.

## 🚀 Installation

Because this is a **User Plugin**, you will need to install it directly into your client's `userplugins` folder.

### Option A: From Source (Vencord & Equicord)
If you run Vencord or Equicord from source, follow these steps:

1. Open your terminal or command prompt.
2. Navigate to your Vencord or Equicord source code folder:
   ```bash
   cd path/to/Vencord/src/userplugins
   # OR
   cd path/to/Equicord/src/userplugins
   ```
3. Clone this repository into the folder:
   ```bash
   git clone https://github.com/xX-TheNeptunes-Xx/FakeDeafen-For-Vencord-And-Equicord FakeDeafen
   ```
4. Rebuild your client:
   ```bash
   pnpm build
   ```
5. Fully restart Discord (CTRL + R or completely quit and reopen).
6. Open your Discord Settings -> Plugins, search for **FakeDeafen**, and enable it!

### Option B: Equicord UserpluginInstaller
If you are using an installed version of **Equicord** that features the UserpluginInstaller:
1. Open your Discord Settings and navigate to the **User Plugins** tab under Equicord.
2. Paste the link to this GitHub repository: 
   `https://github.com/xX-TheNeptunes-Xx/FakeDeafen-For-Vencord-And-Equicord`
3. Click Install and restart your Discord client.
4. Enable **FakeDeafen** in your Plugins list!

## 🖱️ Usage

You can toggle your Fake Deafen status in two ways:
1. **The Chat Bar:** Click the headphone icon in your chat text box. If it's red with a slash, Fake Deafen is ON.
2. **Settings Menu:** Go to Settings -> Plugins -> FakeDeafen -> Settings, and flip the switch.

Both methods will instantly update your status in the voice channel without requiring a reconnect.

## ⚠️ Disclaimer

Client modifications and plugins that fake API states are technically against Discord's Terms of Service. While Vencord and Equicord take steps to keep you safe, use this plugin at your own risk. The author is not responsible for any actions taken against your account.

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
