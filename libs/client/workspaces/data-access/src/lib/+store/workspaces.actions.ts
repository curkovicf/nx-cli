import { createAction, props } from '@ngrx/store';
import { WorkspacesState } from './workspaces.reducer';
import { Workspace } from '../models/workspace.model';


export const setWorkspacesState = createAction('[Workspaces] Set workspaces state', props<{ workspacesState: WorkspacesState }>());

export const selectWorkspace = createAction('[Workspaces] Select workspace', props<{ selectedWorkspace: Workspace }>());

export const addWorkspace = createAction('[Workspaces] Add workspace', props<{ newWorkspace: Workspace }>());

export const deleteWorkspace = createAction('[Workspaces] Delete workspace', props<{ workspace: Workspace }>());

export const addLog = createAction('[Workspaces] Add log to workspace', props<{ workspaceName: string, log: string }>());
