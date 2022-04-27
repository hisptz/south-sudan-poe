import {FlyoutMenu, MenuItem} from "@dhis2/ui";
import {useState} from "react";
import {Language, LANGUAGES} from "../../../core/constants/languages";
import {changeLocale} from "../../utils/language";
import {DropdownButton} from '@dhis2/ui'
import {find} from "lodash";

function Dropdown() {
    const [language, setLanguage] = useState<Language>(LANGUAGES[0]);
    const [open, setOpen] = useState(false);

    const onLanguageChange = (locale: string) => () => {
        changeLocale(locale);
        setLanguage(find(LANGUAGES, {locale}) as Language);
        setOpen(false);
    }

    return (
        <>
            <DropdownButton
                open={open}
                onClick={() => setOpen(prevState => !prevState)}
                component={
                    <FlyoutMenu>
                        {
                            LANGUAGES.map(({locale, name, flag}) => (
                                <MenuItem label={`${name}`} onClick={onLanguageChange(locale)}/>
                            ))
                        }
                    </FlyoutMenu>}
            >{language.flag} {language.name}</DropdownButton>
        </>
    );
}

export default Dropdown;
