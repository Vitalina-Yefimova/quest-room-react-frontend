import contactsBackground from '../../assets/image/contacts-background.png';
import '../../index.css';
import ContactInfo from '../content/ContactInfo';
import GoogleMap from '../content/GoogleMap';
import Footer from '../footer/Footer';
import PageTitle from '../generics/title/PageTitle';
import Header from '../header/Header';
import VectorContactsIcon from '../icons/VectorContactsIcon';

export default function ContactsPage(): React.ReactElement {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-lightgray bg-[445px_-359.026px] bg-[length:80.438%_178.655%] bg-no-repeat filter blur-[45px]"
        style={{ backgroundImage: `url(${contactsBackground})` }}
      ></div>

      <div className="relative z-10">
        <Header className="backdrop-blur-lg" />
        <PageTitle
          className="pt-[138px] pb-[29px] pl-[142px]"
          overline="Quests in Calgary"
          title="Contacts"
        />
        <VectorContactsIcon className="ml-[136px] mr-[150px]" />
        <section className="flex gap-[157px] pr-[150px] pb-[121px]">
          <ContactInfo />
          <GoogleMap />
        </section>
        <Footer />
      </div>
    </section>
  );
}
