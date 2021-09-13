import { library } from '@fortawesome/fontawesome-svg-core';
import { 
    faUserSecret,
    faChartBar,
    faCheckCircle,
    faCogs,
    faSearch,
    faPlus,
    faCheck,
    faEllipsisV
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default function configureFontAwesome(vue) {
    library.add(
        faUserSecret,
        faChartBar,
        faCheckCircle,
        faCogs,
        faSearch,
        faPlus,
        faCheck,
        faEllipsisV
    );
    vue.component('font-awesome-icon', FontAwesomeIcon);
}