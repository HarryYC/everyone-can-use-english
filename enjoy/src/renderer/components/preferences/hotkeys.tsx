import { t } from "i18next";
import { Button, Separator, toast } from "@renderer/components/ui";
import { useContext, useState, useEffect } from "react";
import { AppSettingsProviderContext } from "@renderer/context";

export const Hotkeys = () => {
  const [editing, setEditing] = useState(false);
  const { libraryPath, EnjoyApp } = useContext(AppSettingsProviderContext);

  const commandOrCtrl = navigator.platform.includes("Mac") ? "Cmd" : "Ctrl";

  return (
    <>
      <div className="font-semibold mb-4 capitilized">{t("hotkeys")}</div>

      <div className="mb-6">
        <div className="text-sm text-muted-foreground">{t("system")}</div>

        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">{t("quitApp")}</div>
          <kbd className="bg-muted px-2 py-1 rounded-md text-sm text-muted-foreground">
            {commandOrCtrl} + Q
          </kbd>
        </div>

        <Separator />

        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            {t("openPreferences")}
          </div>
          <kbd className="bg-muted px-2 py-1 rounded-md text-sm text-muted-foreground">
            {commandOrCtrl} + ,
          </kbd>
        </div>
        <Separator />
      </div>

      <div className="mb-6">
        <div className="text-sm text-muted-foreground">{t("player")}</div>

        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">{t("playOrPause")}</div>
          <kbd className="bg-muted px-2 py-1 rounded-md text-sm text-muted-foreground">
            Space
          </kbd>
        </div>

        <Separator />

        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2 capitalize">
            {t("startOrStopRecording")}
          </div>
          <kbd className="bg-muted px-2 py-1 rounded-md text-sm text-muted-foreground">
            r
          </kbd>
        </div>

        <Separator />

        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            {t("playOrPauseRecording")}
          </div>
          <kbd className="bg-muted px-2 py-1 rounded-md text-sm text-muted-foreground">
            {commandOrCtrl} + r
          </kbd>
        </div>

        <Separator />

        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2 capitalize">
            {t("playPreviousSegment")}
          </div>
          <kbd className="bg-muted px-2 py-1 rounded-md text-sm text-muted-foreground">
            p
          </kbd>
        </div>

        <Separator />

        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2 capitalize">
            {t("playNextSegment")}
          </div>
          <kbd className="bg-muted px-2 py-1 rounded-md text-sm text-muted-foreground">
            n
          </kbd>
        </div>

        <Separator />

        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2 capitalize">
            {t("compare")}
          </div>
          <kbd className="bg-muted px-2 py-1 rounded-md text-sm text-muted-foreground">
            c
          </kbd>
        </div>

        <Separator />
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            console.log("aaa");
            EnjoyApp.settings.setHotKeys({
              name: "PlayOrPause",
              key: "Space",
            });
          }}
        >
          aaa
        </Button>
      </div>
    </>
  );
};

// add a button, set hotkeys to settings, need enjoy.setting.setHotKeys
