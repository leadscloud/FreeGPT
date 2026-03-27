# FreeGPT

免费GPT，你的智能AI助手。从2023年开始，至今仍在持续运营。

地址发布页：https://site.tinycms.xyz


## 如何下载

[下载页面](https://github.com/leadscloud/FreeGPT/releases)

点击上面链接，进入下载页面，会展示每个版本的下载链接。根据你的操作系统，选择相应的版本进行下载。

客户端内置一些防屏蔽功能，一般情况下更稳定，不会出现无法使用情况。

## 📦 发布文件介绍

| 文件后缀 | 说明 |
| :--- | :--- |
| **.exe / .msi** | Windows 标准安装包，安装后自动创建桌面快捷方式。 |
| **.msi.zip / .nsis.zip** | **绿色便携版**。下载解压后直接运行内部的 `.exe` 即可使用，无需安装。 |
| **.deb** | Linux (Debian/Ubuntu) 专用安装包。 |
| **.AppImage** | Linux 通用格式。下载后赋予执行权限即可在大多数发行版运行。 |
| **.dmg** | macOS 专用安装包，支持 Intel 和 Apple Silicon (M1/M2/M3) 芯片。 |
| **.sig / .tar.gz** | 系统自动更新专用文件，手动安装请忽略。 |

---

## 💻 平台安装指南

### 🟦 Windows
* **推荐方案**：下载 `FreeGPT_2.16.1_x64-setup.exe` 进行安装。
* **绿色版**：下载 `FreeGPT_2.16.1_x64-setup.nsis.zip`，解压到任意文件夹，直接运行内部的 `.exe` 即可。

### 🐧 Linux

1. **Debian / Ubuntu**:

   下载 `FreeGPT_2.16.1_amd64.deb`，打开终端执行：

   ```bash
   sudo apt install -y ./FreeGPT_2.16.1_amd64.deb
   ```


2. **通用 AppImage**:

   下载 FreeGPT_2.16.1_amd64.AppImage，赋予权限并运行：

   ```bash
   chmod +x FreeGPT_2.16.1_amd64.AppImage
   ./FreeGPT_2.16.1_amd64.AppImage
   ```

### 🍎 macOS (Apple)


1. 下载 FreeGPT_2.16.1_universal.dmg 并打开，将 FreeGPT 拖入 Applications 文件夹。

2. **解决“应用已损坏”警告**：

   由于安装包未经过 Apple 官方签名，启动时若提示损坏或无法验证，请打开终端执行以下命令：

   ```bash
   xattr -cr /Applications/FreeGPT.app
   ```
3. 执行完毕后即可正常打开。

