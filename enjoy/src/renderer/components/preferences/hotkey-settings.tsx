import { t } from "i18next";
import { Button, Input, Separator, toast } from "@renderer/components/ui";
import { useContext, useState, useEffect } from "react";
import { AppSettingsProviderContext } from "@renderer/context";
import { KeyboardInputEvent } from "electron";
import { set } from "lodash";
import { log } from "console";

export const HotKeySettings = () => {
  const [editing, setEditing] = useState(false);
  const [hotKey, setHotKey] = useState<Array<KeyboardEvent>>([]);
  const { hotKeys, setHotKeys } = useContext(AppSettingsProviderContext);

  const commandOrCtrl = navigator.userAgent.includes("Mac") ? "Cmd" : "Ctrl";

  useEffect(() => {
    if (editing) {
      const handleKeyboardEvent = (event: KeyboardEvent) => {
        setHotKey((prev) => {
          if (prev.length < 3) {
            return [...prev, event];
          }
          return prev;
        });
      };

      window.addEventListener("keydown", handleKeyboardEvent);

      return () => {
        window.removeEventListener("keydown", handleKeyboardEvent);
      };
    }
  }, [editing]);

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

        {Object.entries(hotKeys).map((entry) => {
          const [key, value] = entry;
          return (
            <>
              <div className="flex items-center justify-between py-4" id={key}>
                <div className="flex items-center space-x-2">{t(key)}</div>
                <kbd className="bg-muted px-2 py-1 rounded-md text-sm text-muted-foreground">
                  {value}
                </kbd>
              </div>

              <Separator />
            </>
          );
        })}

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
                {(hotKey && hotKey.map((key) => key.key).join(" + ")) ||
                  "Press keys to set hotkey"}
              </kbd>
              <div className="flex items-center space-x-2 justify-end">
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    setEditing(!editing);
                    setHotKey([]);
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
              {hotKey.map((key) => key.key).join(" + ")}
            </kbd>
          )}
        </div>

        <Separator />
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            console.log("aaa");
            // console.log(hotKey.length);
            // console.log(hotKey);
            setHotKey([]);
          }}
        >
          test
        </Button>
      </div>
    </>
  );
};

// add a button, set hotkeys to settings, need enjoy.setting.setHotKey
// EnjoyApp.settings.setHotKey({
//   name: "PlayOrPause1",
//   key: "Space1",
// });
// }}
