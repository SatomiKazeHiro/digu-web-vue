import Vue from 'vue';
import {
  Button,
  Select,
  Option,
  Tree,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Pagination,
  Form,
  FormItem,
  Input,
  Carousel,
  CarouselItem,
  Tabs,
  TabPane,
  Message,
  Loading,
  MessageBox,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Divider,
} from 'element-ui';

Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Tree);
Vue.use(Table);
Vue.use(TableColumn)
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Pagination);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Loading.directive);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Divider);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;

