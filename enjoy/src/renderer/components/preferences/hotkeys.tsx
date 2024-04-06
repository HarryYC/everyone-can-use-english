import { t } from "i18next";
import { Button, Input, Separator, toast } from "@renderer/components/ui";
import { useContext, useState, useEffect } from "react";
import { AppSettingsProviderContext } from "@renderer/context";
import { KeyboardInputEvent } from "electron";
import { set } from "lodash";

export const Hotkeys = () => {
  const [editing, setEditing] = useState(false);
  const [hotkeys, setHotkeys] = useState<Array<KeyboardEvent>>([]);
  const { libraryPath, EnjoyApp } = useContext(AppSettingsProviderContext);

  const commandOrCtrl = navigator.userAgent.includes("Mac") ? "Cmd" : "Ctrl";

  const systemHotkeys = [];

  const playerHotkeys = [];

  useEffect(() => {
    const handleKeyboardEvent = (event: KeyboardEvent) => {
      // Handle the keyboard event here
      setHotkeys((prev) => [...prev, event]);
    };

    window.addEventListener("keydown", handleKeyboardEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyboardEvent);
    };
  }, []);

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

        <div
          className="flex items-center justify-between py-4"
          onDoubleClick={() => console.log(123)}
        >
          <div className="flex items-center space-x-2 capitalize">
            {t("playNextSegment")}
          </div>
          <kbd className="bg-muted px-2 py-1 rounded-md text-sm text-muted-foreground">
            n
          </kbd>
        </div>

        <Separator />

        <div
          className="flex items-center justify-between py-4"
          onDoubleClick={() => {
            setEditing(!editing);
          }}
        >
          <div className="flex items-center space-x-2 capitalize">
            {t("compare")}
          </div>
          {(editing && (
            <>
              <kbd className="bg-muted px-2 py-1 rounded-md text-sm text-muted-foreground mr-4">
                {(hotkeys && hotkeys.map((key) => key.key).join(" + ")) ||
                  "Press keys to set hotkey"}
              </kbd>
              <div className="flex items-center space-x-2 justify-end">
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    setEditing(!editing);
                    e.preventDefault();
                  }}
                  size="sm"
                >
                  {t("cancel")}
                </Button>
                <Button
                  variant="default"
                  onClick={() => setEditing(!editing)}
                  size="sm"
                >
                  {t("save")}
                </Button>
              </div>
            </>
          )) || (
            <kbd className="bg-muted px-2 py-1 rounded-md text-sm text-muted-foreground mr-4">
              {hotkeys.map((key) => key.key).join(" + ")}
            </kbd>
          )}
        </div>

        <Separator />
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            console.log("aaa");
            setHotkeys([]);
          }}
        >
          aaa
        </Button>
      </div>
    </>
  );
};

// add a button, set hotkeys to settings, need enjoy.setting.setHotKeys
