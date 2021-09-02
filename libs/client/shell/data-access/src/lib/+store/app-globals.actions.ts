import { createAction, props } from '@ngrx/store';

export const setIsNxInstalled = createAction('[App Globals] Set state of Nx installation state on user machine', props<{ isNxInstalledOnUserMachine: boolean }>());
