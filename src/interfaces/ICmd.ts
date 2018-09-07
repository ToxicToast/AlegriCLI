export interface ICmd {
	options?: ICmdOption[];
	_name?: string;
	parent?: ICmdParent;
}

export interface ICmdOption {
	flags: string;
	required: boolean;
	optional: boolean;
	bool: boolean;
	short: string;
	long: string;
	description: string;
}

export interface ICmdParent {
	args: any[];
}