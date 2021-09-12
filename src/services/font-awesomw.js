import { library } from '@fortawesome/fontawesome-svg-core';
import { 
    faUserSecret,
    faChartBar,
    faCheckCircle,
    faCogs,
    faSearch,
    faPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default function configureFontAwesome(vue) {
    library.add(
        faUserSecret,
        faChartBar,
        faCheckCircle,
        faCogs,
        faSearch,
        faPlus
    );
    vue.component('font-awesome-icon', FontAwesomeIcon);
}