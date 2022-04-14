import { Card, Button, IconArrowLeft24 } from "@dhis2/ui";
import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();

  return (
    <Button
      icon={<IconArrowLeft24 />}
      name="Primary button"
      value="default"
      onClick={() => navigate(-1)}
    >
      Back
    </Button>
  );
};

export default Back;
