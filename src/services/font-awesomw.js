import { library } from '@fortawesome/fontawesome-svg-core';
import { 
    faUserSecret,
    faChartBar,
    faCheckCircle,
    faCogs
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default function configureFontAwesome(vue) {
    library.add(
        faUserSecret,
        faChartBar,
        faCheckCircle,
        faCogs
    );
    vue.component('font-awesome-icon', FontAwesomeIcon);
}