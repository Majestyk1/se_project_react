import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  onSelectItem,
  openModal,
  openConfirmationModal,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          onSelectItem={onSelectItem}
          openModal={openModal}
          openConfirmationModal={openConfirmationModal}
        />
      </section>
    </div>
  );
}

export default Profile;
