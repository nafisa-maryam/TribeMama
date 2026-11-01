# CLAUDE.md

This file guides Claude Code (claude.ai/code) when working in this repository.

## Project status

**TribeMama** is a new mobile app project. As of 2026-11-01 the repository is empty: no code, no framework and no git history yet. Update this file as decisions are made and code is added.

## What we know so far

- Target: a phone app that runs on multiple platforms (iOS and Android).
- Development machine: Windows 11, PowerShell. Note that iOS builds need macOS or a cloud build service (e.g. Expo EAS), since Xcode doesn't run on Windows.
- The folder lives inside OneDrive. Keep `node_modules`, build output and other large generated folders out of sync (or move the project out of OneDrive) to avoid slow syncs and file-lock errors.

## Decisions still open

Fill these in once chosen:

- **Framework:** _TBD_ (common cross-platform choices: React Native with Expo, Flutter)
- **Language:** _TBD_
- **Backend / data / auth:** _TBD_
- **State management & navigation:** _TBD_
- **Testing:** _TBD_
- **Version control:** not yet a git repo. Run `git init` before the first real code.

## Commands

_None yet._ Once the project is scaffolded, list here how to install dependencies, run on a device or emulator, run tests (including a single test), lint, and build for release.

## Architecture

_None yet._ Once code exists, describe the top-level folder layout, how screens and navigation are organized, where API/data access lives, and any conventions that aren't obvious from reading a single file.
