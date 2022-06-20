import { NgModule } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { MenubarModule, MenubarSub } from 'primeng/menubar';
import { PanelMenu, PanelMenuModule, PanelMenuSub } from 'primeng/panelmenu';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MenuItemContent, MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FrozenColumn, TableModule } from 'primeng/table';
import { SpeedDialModule } from 'primeng/speeddial';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { StepsModule } from 'primeng/steps';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { OrderListModule } from 'primeng/orderlist';
import { TreeModule } from 'primeng/tree';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { SidebarModule } from 'primeng/sidebar';


@NgModule({
  exports: [
    TieredMenuModule,
    SidebarModule,
    InputTextModule,
    TreeModule,
    OrderListModule,
    CheckboxModule,
    TabViewModule,
    StepsModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    InputMaskModule,
    ToastModule,
    PanelMenuModule,
    ScrollingModule,
    MenuModule,
    MenubarModule,
    CardModule,
    DividerModule,
    TableModule,
    SpeedDialModule,
    DialogModule,
    TooltipModule,
    FieldsetModule,
    AccordionModule
  ],

})
export class PrimengModule { }
