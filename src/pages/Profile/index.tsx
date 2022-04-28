import {Button, Card, IconEdit24} from "@dhis2/ui";
import styles from "./Profile.module.css";
import {Link, useParams} from "react-router-dom";
import {currentBookingProfile} from "../../core/states/Booking_state";
import {useRecoilValue} from "recoil";
import {Booking} from "../../core/models/Booking.model";
import html2canvas from "html2canvas";
import JSPdf from "jspdf";
import React from "react";
import QRCode from "react-qr-code";
import {useAlert} from "@dhis2/app-runtime";
import i18n from '@dhis2/d2-i18n'
import Loader from "../../shared/components/Loader";

const Profile = () => {
    const {id} = useParams<string>();
    let currentBookProfile = useRecoilValue<Booking>(currentBookingProfile(id));
    const {show} = useAlert(({message}) => message, ({type}) => ({...type, duration: 3000}))

    function downloadDashboard() {
        const input = document.getElementById('print-profile');
        html2canvas(input as HTMLElement)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new JSPdf("p", "px", "a5");
                let width = pdf.internal.pageSize.getWidth();
                pdf.addImage(imgData, 'PNG', -2, 30, width, width * (canvas.height / canvas.width));
                pdf.save(currentBookProfile.firstName + "_Profile.pdf");
            }).catch(error => {
            show({
                message: `Download failed: ${error?.message ?? "An unknown error occurred"}`,
                type: {info: true}
            })
        })
    }

    let linkToEditProfile = "/registration/" + currentBookProfile.id;

    return (
        <React.Suspense fallback={<Loader/>}>
            <div className={styles.container}>
                <div className="content-body">
                    <h2>
                        {
                            i18n.t("Traveller profile")
                        }
                        <Link to={linkToEditProfile}>
                            <IconEdit24/>
                        </Link>{" "}
                    </h2>
                    <Card>
                        <div
                            className={styles["flex-row"]}
                            style={{padding: "20px", minHeight: 400}}
                            id="print-profile"
                        >
                            <div className={styles["flex-item"]}>
                                <div className={styles["flex-column"]}>
                                    <div className={styles["flex-item"]}>
                                        <label className={styles["label-title"]} htmlFor="name">
                                            {i18n.t("Name")}:
                                        </label>
                                        <label className="label-subtitle" htmlFor="value">
                                            {currentBookProfile.fullName}
                                        </label>
                                    </div>
                                    <div className={styles["flex-item"]}>
                                        <label className={styles["label-title"]} htmlFor="name">
                                            {i18n.t("Passport")}:
                                        </label>
                                        <label className="label-subtitle" htmlFor="value">
                                            {currentBookProfile.passport}
                                        </label>
                                    </div>
                                    <div className={styles["flex-item"]}>
                                        <label className={styles["label-title"]} htmlFor="name">
                                            {i18n.t("Phone number")}:
                                        </label>
                                        <label className="label-subtitle" htmlFor="value">
                                            {currentBookProfile.phoneNumber}
                                        </label>
                                    </div>
                                    <div className={styles["flex-item"]}>
                                        <label className={styles["label-title"]} htmlFor="name">
                                            {i18n.t("Email")}:
                                        </label>
                                        <label className="label-subtitle" htmlFor="value">
                                            {currentBookProfile.email}
                                        </label>
                                    </div>
                                    <div className={styles["flex-item"]}>
                                        <label className={styles["label-title"]} htmlFor="name">
                                            {i18n.t("Gender")}:
                                        </label>
                                        <label className="label-subtitle" htmlFor="value">
                                            {currentBookProfile.gender}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className={styles["flex-item"]}>
                                <div className={styles["flex-column"]}>
                                    <div className={styles["flex-item"]}>
                                        <label className={styles["label-title"]} htmlFor="name">
                                            {i18n.t("Point of Entry")}:
                                        </label>
                                        <label className="label-subtitle" htmlFor="value">
                                            {currentBookProfile.poe}
                                        </label>
                                    </div>
                                    <div className={styles["flex-item"]}>
                                        <label className={styles["label-title"]} htmlFor="name">
                                            {i18n.t("Arrival Date")}:
                                        </label>
                                        <label className="label-subtitle" htmlFor="value">
                                            {currentBookProfile.arrivalDate}
                                        </label>
                                    </div>
                                    <div className={styles["flex-item"]}>
                                        <label className={styles["label-title"]} htmlFor="name">
                                            {i18n.t("Flight number")}:
                                        </label>
                                        <label className="label-subtitle" htmlFor="value">
                                            {currentBookProfile.flightNumber}
                                        </label>
                                    </div>
                                    <div className={styles["flex-item"]}>
                                        <label className={styles["label-title"]} htmlFor="name">
                                            {i18n.t("Nationality")}:
                                        </label>
                                        <label className="label-subtitle" htmlFor="value">
                                            {currentBookProfile.nationality}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className={styles["QR-code-container"]}>
                                <div className={styles["QR-code"]}>
                                    <QRCode size={320}
                                            value={currentBookProfile.toQRCodeData()}/>
                                </div>
                                <Button id="print-button" onClick={downloadDashboard}>{i18n.t("Print")}</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </React.Suspense>
    );
};

export default Profile;
