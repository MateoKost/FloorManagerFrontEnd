
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faPen, faLightBulb,  faChair,  faFireExtinguisher,  faTshirt,  faMugHot,  faInbox,  faBed,  
    faBookOpen,  faBook,  faMedkit,  faFileAlt,  faKey,  faServer,  faBroom,  faBrush,  faLightbulb
  } from '@fortawesome/free-solid-svg-icons'

const  itemIconNames = [
          { name:"Lampka",   faIcon: <FontAwesomeIcon icon={faLightbulb} />},
          { name:"Krzesło", faIcon:<FontAwesomeIcon icon={faChair} />},
          { name:"Gaśnica", faIcon:<FontAwesomeIcon icon={faFireExtinguisher} />},
          { name:"Szafa", faIcon:<FontAwesomeIcon icon={faTshirt} />},
          { name:"Czajnik", faIcon:<FontAwesomeIcon icon={faMugHot} />},
          { name:"Komoda", faIcon:<FontAwesomeIcon icon={faInbox} />},
          { name:"Łóżko", faIcon:<FontAwesomeIcon icon={faBed} />},
          { name:"Biurko", faIcon:<FontAwesomeIcon icon={faBookOpen} />},
          { name:"Regał", faIcon:<FontAwesomeIcon icon={faBook} />},
          { name:"Apteczka", faIcon:<FontAwesomeIcon icon={faMedkit} />},
          { name:"Dokumentacja", faIcon:<FontAwesomeIcon icon={faFileAlt} />},
          { name:"Szafka z kluczami", faIcon:<FontAwesomeIcon icon={faKey} />},
          { name:"Serwer", faIcon:<FontAwesomeIcon icon={faServer} />},
          { name:"Miotła", faIcon:<FontAwesomeIcon icon={faBroom} />},
          { name:"Szczotka", faIcon:<FontAwesomeIcon icon={faBrush} />},
          { name:"Śmietnik", faIcon:<FontAwesomeIcon icon={faTrash} />},
];

export default itemIconNames;
  