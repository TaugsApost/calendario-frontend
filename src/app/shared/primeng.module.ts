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


@NgModule({
  exports: [
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
  ],

})
export class PrimengModule { }
