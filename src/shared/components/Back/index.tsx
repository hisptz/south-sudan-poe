import {Button, IconArrowLeft24} from "@dhis2/ui";
import {useNavigate} from "react-router-dom";
import i18n from '@dhis2/d2-i18n';


const Back = () => {
    const navigate = useNavigate();

    return (
        <Button
            icon={<IconArrowLeft24/>}
            name="Primary button"
            value="default"
            onClick={() => navigate(-1)}
        >
            {
                i18n.t("Back")
            }
        </Button>
    );
};

export default Back;
