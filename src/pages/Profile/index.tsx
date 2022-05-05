import { Button, Card, IconEdit24 } from "@dhis2/ui";
import styles from "./Profile.module.css";
import { Link, useParams } from "react-router-dom";
import { currentBookingProfile } from "../../core/states/Booking_state";
import { useRecoilValue } from "recoil";
import { Booking } from "../../core/models/Booking.model";
import React, { useState } from "react";
import QRCode from "react-qr-code";
import { useAlert } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import Loader from "../../shared/components/Loader";
import printJS from "print-js";
import south_sudan_logo from "../../assets/south-sudan-logo.jpg";

const Profile = () => {
  const { id } = useParams<string>();
  let currentBookProfile = useRecoilValue<Booking>(currentBookingProfile(id));
  const { show } = useAlert(
    ({ message }) => message,
    ({ type }) => ({ ...type, duration: 3000 })
  );

  const [isPrint, setPrintStatus] = useState<boolean>(false);

  function downloadDashboard() {
    setPrintStatus(true);
    setTimeout(() => {
      try {
        printJS({
          printable: "print-profile",
          type: "html",
          targetStyles: ["*"],
        });
        setTimeout(() => {
          setPrintStatus(false);
        }, 0.1);
      } catch (error) {
        setPrintStatus(false);
        show({
          message: `Download failed: ${error ?? "An unknown error occurred"}`,
          type: { info: true },
        });
      }
    });
  }

  let linkToEditProfile = "/registration/" + currentBookProfile.id;

  return (
    <React.Suspense fallback={<Loader />}>
      <div className={styles.container}>
        <div className="content-body">
          <h2>
            {i18n.t("Traveller profile")}
            <Link to={linkToEditProfile}>
              <IconEdit24 />
            </Link>{" "}
          </h2>
          <Card>
            <div
              className={styles["flex-row"]}
              style={{ padding: "20px", minHeight: 400 }}
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
                  <QRCode
                    size={320}
                    value={currentBookProfile.toQRCodeData()}
                  />
                </div>
                <Button id="print-button" onClick={downloadDashboard}>
                  {i18n.t("Print")}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div>
        {/* 
         Printing profile 
        */}
        <div>
          <div
            className={styles[isPrint ? "prifile" : "no_print"]}
            id="print-profile"
          >
            <img
              src={`${south_sudan_logo}`}
              alt={i18n.t("Welcome to South Sudan")}
              className={styles["logo"]}
            />

            <div
              className={styles["flex-row_print"]}
              style={{ padding: "20px" }}
            >
              <div className={styles["flex-item_print"]}>
                <div className={styles["flex-column_print"]}>
                  <div className={styles["flex-item_print"]}>
                    <label className={styles["label-title"]} htmlFor="name">
                      {i18n.t("Name")}:
                    </label>
                    <label className="label-subtitle" htmlFor="value">
                      {currentBookProfile.fullName}
                    </label>
                  </div>
                  <div className={styles["flex-item_print"]}>
                    <label className={styles["label-title"]} htmlFor="name">
                      {i18n.t("Passport")}:
                    </label>
                    <label className="label-subtitle" htmlFor="value">
                      {currentBookProfile.passport}
                    </label>
                  </div>
                  <div className={styles["flex-item_print"]}>
                    <label className={styles["label-title"]} htmlFor="name">
                      {i18n.t("Phone number")}:
                    </label>
                    <label className="label-subtitle" htmlFor="value">
                      {currentBookProfile.phoneNumber}
                    </label>
                  </div>
                  <div className={styles["flex-item_print"]}>
                    <label className={styles["label-title"]} htmlFor="name">
                      {i18n.t("Email")}:
                    </label>
                    <label className="label-subtitle" htmlFor="value">
                      {currentBookProfile.email}
                    </label>
                  </div>
                  <div className={styles["flex-item_print"]}>
                    <label className={styles["label-title"]} htmlFor="name">
                      {i18n.t("Gender")}:
                    </label>
                    <label className="label-subtitle" htmlFor="value">
                      {currentBookProfile.gender}
                    </label>
                  </div>
                </div>
              </div>
              <div className={styles["flex-item_print"]}>
                <div className={styles["flex-column_print"]}>
                  <div className={styles["flex-item_print"]}>
                    <label className={styles["label-title"]} htmlFor="name">
                      {i18n.t("Point of Entry")}:
                    </label>
                    <label className="label-subtitle" htmlFor="value">
                      {currentBookProfile.poe}
                    </label>
                  </div>
                  <div className={styles["flex-item_print"]}>
                    <label className={styles["label-title"]} htmlFor="name">
                      {i18n.t("Arrival Date")}:
                    </label>
                    <label className="label-subtitle" htmlFor="value">
                      {currentBookProfile.arrivalDate}
                    </label>
                  </div>
                  <div className={styles["flex-item_print"]}>
                    <label className={styles["label-title"]} htmlFor="name">
                      {i18n.t("Flight number")}:
                    </label>
                    <label className="label-subtitle" htmlFor="value">
                      {currentBookProfile.flightNumber}
                    </label>
                  </div>
                  <div className={styles["flex-item_print"]}>
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
                  <QRCode
                    size={200}
                    value={currentBookProfile.toQRCodeData()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Suspense>
  );
};

export default Profile;
