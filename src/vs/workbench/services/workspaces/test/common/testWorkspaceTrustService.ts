/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Emitter, Event } from 'vs/base/common/event';
import { URI } from 'vs/base/common/uri';
import { WorkspaceTrustRequestOptions, IWorkspaceTrustManagementService, IWorkspaceTrustRequestService, IWorkspaceTrustInfo, IWorkspaceTrustUriInfo } from 'vs/platform/workspace/common/workspaceTrust';


export class TestWorkspaceTrustManagementService implements IWorkspaceTrustManagementService {
	_serviceBrand: undefined;

	private _onDidChangeTrust = new Emitter<boolean>();
	onDidChangeTrust = this._onDidChangeTrust.event;

	private trusted: boolean;

	constructor(trusted: boolean = true) {
		this.trusted = trusted;
	}
	getFolderTrustInfo(folder: URI): IWorkspaceTrustUriInfo {
		throw new Error('Method not implemented.');
	}
	getTrustInfo(): IWorkspaceTrustInfo {
		throw new Error('Method not implemented.');
	}
	setTrustedFolders(folders: URI[]): void {
		throw new Error('Method not implemented.');
	}
	setFoldersTrust(folders: URI[], trusted: boolean): void {
		throw new Error('Method not implemented.');
	}

	canSetParentFolderTrust(): boolean {
		throw new Error('Method not implemented.');
	}

	canSetWorkspaceTrust(): boolean {
		throw new Error('Method not implemented.');
	}

	isWorkpaceTrusted(): boolean {
		return this.trusted;
	}

	setOpenEditors(openEditors: URI[]): void {
		throw new Error('Method not implemented.');
	}

	setWorkspaceTrust(trusted: boolean): void {
		if (this.trusted !== trusted) {
			this.trusted = trusted;
			this._onDidChangeTrust.fire(this.trusted);
		}
	}
}

export class TestWorkspaceTrustRequestService implements IWorkspaceTrustRequestService {
	_serviceBrand: undefined;

	onDidInitiateWorkspaceTrustRequest: Event<WorkspaceTrustRequestOptions> = Event.None;
	onDidCompleteWorkspaceTrustRequest: Event<boolean> = Event.None;


	cancelRequest(): void {
		throw new Error('Method not implemented.');
	}

	completeRequest(trusted?: boolean): void {
		throw new Error('Method not implemented.');
	}

	requestWorkspaceTrust(options?: WorkspaceTrustRequestOptions): Promise<boolean> {
		return Promise.resolve(true);
	}
}
