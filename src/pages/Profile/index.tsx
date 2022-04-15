import {Button, Card, IconEdit24} from "@dhis2/ui";
import styles from "./Profile.module.css";
import {Link, useParams} from "react-router-dom";
import {currentBookingProfile} from "../../core/states/Booking_state";
import {useRecoilValue} from "recoil";
import {Booking} from "../../core/models/Booking.model";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";
import QRCode from "react-qr-code";


const Profile = () => {
    const {id} = useParams<string>();
    let currentBookProfile = useRecoilValue<Booking>(currentBookingProfile(id));

    function downloadDashboard() {
        const input = document.getElementById('print-profile');
        html2canvas(input as HTMLElement)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF("p", "px", "a5");
                let width = pdf.internal.pageSize.getWidth();
                pdf.addImage(imgData, 'PNG', -2, 30, width, width * (canvas.height / canvas.width));
                pdf.save(currentBookProfile.firstName + "_Profile.pdf");
            });
    }

    let linkToEditProfile = "/registration/" + currentBookProfile.id;

    return (
        <React.Suspense fallback={<div>Loading</div>}>
            <div className={styles.container}>
                <div className="content-body">
                    <h2>
                        Traveller profile{" "}
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
                                            Name:
                                        </label>
                                        <label className="label-subtitle" htmlFor="value">
                                            {currentBookProfile.fullName}
                                        </label>
                                    </div>
                                    <div className={styles["flex-item"]}>
                                        <label className={styles["label-title"]} htmlFor="name">
                                            Passport:
                                        </label>
                                        <label className="label-subtitle" htmlFor="value">
                                            {currentBookProfile.passport}
                                        </label>
                                    </div>
                                    <div className={styles["flex-item"]}>
                                        <label className={styles["label-title"]} htmlFor="name">
                                            Phone number:
                                        </label>
                                        <label className="label-subtitle" htmlFor="value">
                                            {currentBookProfile.phoneNumner}
                                        </label>
                                    </div>
                                    <div className={styles["flex-item"]}>
                                        <label className={styles["label-title"]} htmlFor="name">
                                            Email:
                                        </label>
                                        <label className="label-subtitle" htmlFor="value">
                                            {currentBookProfile.email}
                                        </label>
                                    </div>
                                    <div className={styles["flex-item"]}>
                                        <label className={styles["label-title"]} htmlFor="name">
                                            Gender:
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
                                            Point of Entry:
                                        </label>
                                        <label className="label-subtitle" htmlFor="value">
                                            {currentBookProfile.poe}
                                        </label>
                                    </div>
                                    <div className={styles["flex-item"]}>
                                        <label className={styles["label-title"]} htmlFor="name">
                                            Arrival date:
                                        </label>
                                        <label className="label-subtitle" htmlFor="value">
                                            28/03/2022
                                        </label>
                                    </div>
                                    <div className={styles["flex-item"]}>
                                        <label className={styles["label-title"]} htmlFor="name">
                                            Flight number:
                                        </label>
                                        <label className="label-subtitle" htmlFor="value">
                                            {currentBookProfile.flightNumber}
                                        </label>
                                    </div>
                                    <div className={styles["flex-item"]}>
                                        <label className={styles["label-title"]} htmlFor="name">
                                            Nationality:
                                        </label>
                                        <label className="label-subtitle" htmlFor="value">
                                            Tanzania
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className={styles["QR-code-container"]}>
                                <div className={styles["QR-code"]}>
                                    <QRCode size={320}
                                            value={currentBookProfile.toQRCodeData()}/>
                                </div>
                                <Button onClick={downloadDashboard}>Print</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </React.Suspense>
    );
};

export default Profile;
