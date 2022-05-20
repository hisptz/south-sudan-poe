import { FlyoutMenu, MenuItem } from "@dhis2/ui";
import { useMemo, useState } from "react";
import { Language, LANGUAGES } from "../../../core/constants/languages";
import { DropdownButton } from "@dhis2/ui";
import { find } from "lodash";
import { useRecoilState } from "recoil";
import { LocaleState } from "../../../core/states/language";

function LanguageSelector() {
  const [locale, setLocale] = useRecoilState(LocaleState);
  const language = useMemo<Language>(
    () =>
      (find(LANGUAGES, { locale: locale }) as Language) ??
      (LANGUAGES[0] as Language),
    [locale]
  );
  const [open, setOpen] = useState(false);

  const onLanguageChange = (locale: string) => () => {
    setLocale(locale);
    setOpen(false);
  };

  return (
    <>
      <DropdownButton
        open={open}
        onClick={() => setOpen((prevState) => !prevState)}
        component={
          <FlyoutMenu>
            {LANGUAGES.map(({ locale, name, flag }) => (
              <MenuItem
                key={`${locale}-option`}
                label={`${flag}  ${name}`}
                onClick={onLanguageChange(locale)}
              />
            ))}
          </FlyoutMenu>
        }
      >
        {language?.flag} {language?.name}
      </DropdownButton>
    </>
  );
}

export default LanguageSelector;
