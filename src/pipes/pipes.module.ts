import { NgModule } from '@angular/core';
import { PipesPipe } from './pipes/pipes';
import { DatetimePipe } from './datetime/datetime';
@NgModule({
	declarations: [PipesPipe,
    DatetimePipe],
	imports: [],
	exports: [PipesPipe,
    DatetimePipe]
})
export class PipesModule {}
