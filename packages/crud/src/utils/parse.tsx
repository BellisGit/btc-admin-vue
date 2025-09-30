import { isString } from "lodash-es";
import { getValue, isObject } from ".";

// 解析扩展组件
export function parseExtensionComponent(vnode: any) {
	if (["el-select", "el-radio-group", "el-checkbox-group"].includes(vnode.name!)) {
		const list = getValue(vnode.options || []);

		const children = (
			<div>
				{list.map((e: any, i: number) => {
					let label: any;
					let value: any;

					if (isString(e)) {
						label = value = e;
					} else if (isObject(e)) {
						label = (e as any).label;
						value = (e as any).value;
					} else {
						return <cl-error-message title={`Component options error`} />;
					}

					switch (vnode.name) {
						case "el-select":
							return <el-option key={i} label={label} value={value} {...(e as any).props} />;
						case "el-radio-group":
							return (
								<el-radio key={i} value={value} {...(e as any).props}>
									{label}
								</el-radio>
							);
						case "el-checkbox-group":
							return (
								<el-checkbox key={i} value={value} {...(e as any).props}>
									{label}
								</el-checkbox>
							);
						default:
							return null;
					}
				})}
			</div>
		);

		return {
			children
		};
	} else {
		return {};
	}
}
