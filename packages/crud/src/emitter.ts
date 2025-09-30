export const crudList: any[] = [];

export const emitter: any = {
	list: [],
	init(events: any) {
		for (const i in events) {
			this.on(i, events[i]);
		}
	},
	emit(name: string, data: any) {
		this.list.forEach((e: any) => {
			const [_name] = e.name.split("-");

			if (name == _name) {
				e.callback(data, {
					crudList,
					refresh(params: any) {
						crudList.forEach((c: any) => c.refresh(params));
					}
				});
			}
		});
	},
	on(name: string, callback: any) {
		this.list.push({ name, callback });
	}
};
