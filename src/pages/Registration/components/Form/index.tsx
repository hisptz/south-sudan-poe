import { Input, FieldGroup, Checkbox, TextArea, Button } from '@dhis2/ui'
import styles from './Form.module.css';

function Form() {
    const checkForms: any[] = [
        'Sudden onset of fever', 'Unexplained Bleeding', 'Muscle Pain', 'Headache', 'loss of appetite',
        'Vomitting', 'Diarrhea', 'Lethargy', 'Stomach Paign', 'Breathing difficulties', 'Hiccup', 'Cough',
        'Sore throat', 'Sudden loss of smell', 'Sudden loss of test', 'None of above', 'Other'
    ];

    const declaration = `I declare that the Information provided is complete and correct to the best of my knowledge.
    I understand that any false information filled could lead to denial or
    prosecution in accordance to law.`;

    return (
        <div className={styles.container}>
            <div className={styles["form-group"]}>
                <div className={styles["label-container"]}>
                    <label>Names</label>
                </div>
                <div className={styles["content-container"]}>
                    <div>
                        <label htmlFor="firstname">First name</label>
                        <Input type="text" />
                    </div>
                    <div>
                        <label htmlFor="firstname">Middle name</label>
                        <Input type="text" />
                    </div>
                    <div>
                        <label htmlFor="firstname">Last name</label>
                        <Input type="text" />
                    </div>
                </div>
            </div>
            <div className={styles["form-group"]}>
                <div className={styles["label-container"]}>
                    <label>Personal Details</label>
                </div>
                <div className={styles["content-container"]}>
                    <div>
                        <label htmlFor="firstname">Date of birth</label>
                        <Input type="text" />
                    </div>
                    <div>
                        <label htmlFor="firstname">Age</label>
                        <Input type="text" />
                    </div>
                    <div>
                        <label htmlFor="firstname">Sex</label>
                        <Input type="text" />
                    </div>
                    <div>
                        <label htmlFor="firstname">Nationality</label>
                        <Input type="text" />
                    </div>
                </div>
            </div>
            <div className={styles["form-group"]}>
                <div className={styles["label-container"]}>
                    <label>Contact Informations</label>
                </div>
                <div className={styles["content-container"]}>
                    <div>
                        <label htmlFor="firstname">Date of birth</label>
                        <Input type="text" />
                    </div>
                </div>
            </div>
            <div className={styles["form-group"]}>
                <div className={styles["label-container"]}>
                    <label>Trips Informantion</label>
                </div>
                <div className={styles["content-container"]}>
                    <div>
                        <label htmlFor="firstname">Passport number</label>
                        <Input type="text" />
                    </div>
                    <div>
                        <label htmlFor="firstname">Mode of transport</label>
                        <Input type="text" />
                    </div>
                    <div>
                        <label htmlFor="firstname">Point of entry</label>
                        <Input type="text" />
                    </div>
                    <div>
                        <label htmlFor="firstname">Arrival date</label>
                        <Input type="text" />
                    </div>
                    <div>
                        <label htmlFor="firstname">Flight number</label>
                        <Input type="text" />
                    </div>
                    <div>
                        <label htmlFor="firstname">Physical address while in South Sudan</label>
                        <Input type="text" />
                    </div>
                    <div>
                        <label htmlFor="firstname">Phone number while ins South Sudan</label>
                        <Input type="text" />
                    </div>
                    <div>
                        <label htmlFor="firstname">Email while in South Sudan</label>
                        <Input type="text" />
                    </div>
                </div>
            </div>
            <div className={styles["form-group"]}>
                <div className={styles["label-container"]}>
                    <label>Health Informantion</label>
                </div>
                <div className={styles["content-container"]}>
                    <label htmlFor="">Signs and symptoms</label>
                    <div style={{ padding: "0 0 0 16px" }}>
                        <FieldGroup>
                            {checkForms.map(x => <Checkbox label={x} value={x} />)}
                        </FieldGroup>
                    </div>
                    <label htmlFor="">Other Signs and symptoms</label>
                    <TextArea
                        name="textAreaName"
                    />
                </div>
            </div>
            <div className={styles["form-group"]}>
                <div className={styles["label-container"]}>
                    <label>Declaration of filled Informantion</label>
                </div>
                <div className={styles["content-container"]}></div>
            </div>
            <div className={styles["form-group"]}>
                <div className={styles["label-container"]}></div>
                <div className={styles["content-container"]}>
                    <div className={styles["checkbox-container"]}>
                        <Checkbox label={declaration} />
                    </div>
                </div>
            </div>
            <div className={styles["form-group"]}>
                <Button name="Primary button" value="default">Cancel</Button>
                <Button name="Primary button" value="default">Save</Button>
            </div>
        </div>
    );
}

export default Form;