import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Permission, Role, RoleTypes } from '../../utils/roles';

export interface PermissionsState {
	roles: Set<RoleTypes>;
	loginEnabled: boolean;
	loggedIn: boolean;
	locked: boolean;
	signInRequired: boolean;
	roomPermissions?: Record<Permission, Role>;
	allowWhenRoleMissing?: Permission[];
}

const initialState: PermissionsState = {
	roles: new Set<RoleTypes>(),
	loginEnabled: true,
	loggedIn: false,
	locked: false,
	signInRequired: false,
};

const permissionsSlice = createSlice({
	name: 'permissions',
	initialState,
	reducers: {
		addRole: ((state, action: PayloadAction<{ roleId: number }>) => {
			state.roles.add(action.payload.roleId);
		}),
		removeRole: ((state, action: PayloadAction<{ roleId: number }>) => {
			state.roles.delete(action.payload.roleId);
		}),
		setLoginEnabled: ((state, action: PayloadAction<{ loginEnabled: boolean }>) => {
			state.loginEnabled = action.payload.loginEnabled;
		}),
		setLoggedIn: ((state, action: PayloadAction<{ loggedIn: boolean }>) => {
			state.loggedIn = action.payload.loggedIn;
		}),
		setLocked: ((state, action: PayloadAction<{ locked: boolean }>) => {
			state.locked = action.payload.locked;
		}),
		setSignInRequired: ((state, action: PayloadAction<{ signInRequired: boolean }>) => {
			state.signInRequired = action.payload.signInRequired;
		}),
		setRoomPermissions: ((
			state,
			action: PayloadAction<{ roomPermissions: Record<Permission, Role> }>
		) => {
			state.roomPermissions = action.payload.roomPermissions;
		}),
		setAllowWhenRoleMissing: ((
			state,
			action: PayloadAction<{ allowWhenRoleMissing: Permission[] }>
		) => {
			state.allowWhenRoleMissing = action.payload.allowWhenRoleMissing;
		}),
	},
});

export const permissionsActions = permissionsSlice.actions;
export default permissionsSlice;