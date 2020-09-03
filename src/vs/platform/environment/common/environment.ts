/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator } from 'vs/platform/instantiation/common/instantiation';
import { URI } from 'vs/base/common/uri';
import { NativeParsedArgs } from 'vs/platform/environment/common/argv';

export const IEnvironmentService = createDecorator<IEnvironmentService>('environmentService');

export interface IDebugParams {
	port: number | null;
	break: boolean;
}

export interface IExtensionHostDebugParams extends IDebugParams {
	debugId?: string;
}

export const BACKUPS = 'Backups';

/**
 * A basic environment service that can be used in various processes,
 * such as main, renderer and shared process. Use subclasses of this
 * service for specific environment.
 */
export interface IEnvironmentService {

	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// NOTE: DO NOT ADD ANY OTHER PROPERTY INTO THE COLLECTION HERE
	// UNLESS THIS PROPERTY IS SUPPORTED BOTH IN WEB AND NATIVE!!!!
	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

	readonly _serviceBrand: undefined;

	// --- user roaming data
	userRoamingDataHome: URI;
	settingsResource: URI;
	keybindingsResource: URI;
	keyboardLayoutResource: URI;
	argvResource: URI;
	snippetsHome: URI;

	// --- data paths
	backupHome: URI;
	untitledWorkspacesHome: URI;

	globalStorageHome: URI;
	workspaceStorageHome: URI;

	// --- settings sync
	userDataSyncLogResource: URI;
	userDataSyncHome: URI;
	sync: 'on' | 'off' | undefined;
	enableSyncByDefault: boolean;

	// --- extension development
	debugExtensionHost: IExtensionHostDebugParams;
	isExtensionDevelopment: boolean;
	disableExtensions: boolean | string[];
	extensionDevelopmentLocationURI?: URI[];
	extensionTestsLocationURI?: URI;

	// --- logging
	logsPath: string;
	logLevel?: string;
	verbose: boolean;
	isBuilt: boolean;

	// --- misc
	disableTelemetry: boolean;
	serviceMachineIdResource: URI;

	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// NOTE: DO NOT ADD ANY OTHER PROPERTY INTO THE COLLECTION HERE
	// UNLESS THIS PROPERTY IS SUPPORTED BOTH IN WEB AND NATIVE!!!!
	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}

export interface INativeEnvironmentService extends IEnvironmentService {

	// --- CLI Arguments
	args: NativeParsedArgs;

	// --- paths
	appRoot: string;
	userHome: URI;
	appSettingsHome: URI;
	userDataPath: string;
	machineSettingsResource: URI;
	backupWorkspacesPath: string;
	nodeCachedDataDir?: string;
	installSourcePath: string;

	// --- IPC Handles
	mainIPCHandle: string;
	sharedIPCHandle: string;

	// --- Extensions
	extensionsPath?: string;
	extensionsDownloadPath: string;
	builtinExtensionsPath: string;

	// --- Smoke test support
	driverHandle?: string;
	driverVerbose: boolean;

	// --- Misc. config
	disableUpdates: boolean;
	sandbox: boolean;
}
