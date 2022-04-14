import { Card, Button, IconEdit24 } from "@dhis2/ui";
import styles from "./Profile.module.css";
import Back from "../../shared/components/Back";
import { Link, useParams } from "react-router-dom";
import QRCODE from "../../assets/QR-Code.png";
import { useCurrentBookingProfile } from "../../core/hooks/booking.hooks";
import { currentBookingProfile } from "../../core/states/Booking_state";
import { useRecoilValue } from "recoil";
import { Booking } from "../../core/models/Booking.model";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


const Profile = () => {
   const {id} =useParams<string>()
 useCurrentBookingProfile(id as string)
 let currentBookProfile = useRecoilValue<Booking>(currentBookingProfile);

 function downloadDashbord() {
  const input = document.getElementById('print-profile');
  html2canvas(input as HTMLElement)
      .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF("p", "px", "a4");
          let width = pdf.internal.pageSize.getWidth();
        pdf.addImage(imgData, 'PNG', 10, 20, width,width*(canvas.height / canvas.width) );
          pdf.save(currentBookProfile.firstName+"_Profile.pdf");
      });
  }

  return (
    <div className={styles.container}>
      <Back />
      <div className="content-body">
        <h2>
          Traveller profile{" "}
          <Link to="/registration/123">
            <IconEdit24 />
          </Link>{" "}
        </h2>
        <Card>
          <div
            className={styles["flex-row"]}
            style={{ padding: "20px", minHeight: 400 }}
            id="print-profile"
          >
            <div className={styles["flex-item"]}>
              <div className={styles["flex-column"]}>
                <div className={styles["flex-item"]}>
                  <label className={styles["label-title"]} htmlFor="name">
                    Name:
                  </label>
                  <label className="label-subtitle" htmlFor="value">
                    John Doe Joe
                  </label>
                </div>
                <div className={styles["flex-item"]}>
                  <label className={styles["label-title"]} htmlFor="name">
                    Passport:
                  </label>
                  <label className="label-subtitle" htmlFor="value">
                    XSRGFSFUISJ
                  </label>
                </div>
                <div className={styles["flex-item"]}>
                  <label className={styles["label-title"]} htmlFor="name">
                    Phone number:
                  </label>
                  <label className="label-subtitle" htmlFor="value">
                    +25578368389
                  </label>
                </div>
                <div className={styles["flex-item"]}>
                  <label className={styles["label-title"]} htmlFor="name">
                    Email:
                  </label>
                  <label className="label-subtitle" htmlFor="value">
                    user@gmail.com
                  </label>
                </div>
                <div className={styles["flex-item"]}>
                  <label className={styles["label-title"]} htmlFor="name">
                    Gender:
                  </label>
                  <label className="label-subtitle" htmlFor="value">
                    Male
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
                    Juma inernational airport
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
                    T831237
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
                <img src={QRCODE} alt="" />
              </div>
              <Button>Print</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
