<template>
	<div>
		<div class="title">BTC CRUD DEMO v8</div>

		<btc-crud ref="Crud">
			<div class="search">
				<btc-search ref="Search" />
			</div>

			<btc-row>
				<btc-add-btn />

				<btc-flex1 />

				<btc-search-key
					field="name"
					:field-list="[
						{
							label: '昵称',
							value: 'name'
						},
						{
							label: '手机号',
							value: 'phone'
						}
					]"
					refreshOnInput
				/>
			</btc-row>

			<btc-row>
				<btc-table ref="Table" :auto-height="false"></btc-table>
			</btc-row>

			<btc-row>
				<btc-flex1 />
				<btc-pagination />
			</btc-row>

			<btc-upsert ref="Upsert"></btc-upsert>
			<btc-form ref="Form"></btc-form>
		</btc-crud>
	</div>
</template>

<script setup lang="tsx">
import { useTable, useForm, useUpsert, useCrud, useSearch } from "./hooks";
import { EditPen } from "@element-plus/icons-vue";

interface Data {
	name?: string;
	age?: number;
	[key: string]: any;
}

const Upsert = useUpsert<Data>({
	items: [
		{
			type: "tabs",
			props: {
				labels: [
					{
						label: "基础",
						value: "A",
						icon: EditPen
					},
					{
						label: "高级",
						value: "B"
					}
				]
			}
		},
		{
			group: "A",
			prop: "age",
			label: "年龄",
			component: {
				name: "el-input"
			}
		},
		{
			group: "A",
			prop: "name",
			label: "昵称",
			component: {
				name: "el-input"
			},
			hidden({ scope }: any) {
				return scope.age < 18;
			}
		},
		{
			group: "B",
			prop: "phone",
			label: "手机",
			component: {
				name: "el-input"
			},
			hidden({ scope }: any) {
				return scope.age < 18;
			}
		},
		() => {
			return {
				group: "A",
				hidden: Upsert.value?.mode == "add"
			};
		}
	],
	onOpened(data: any) {
		console.log(data);
		Upsert.value?.setForm("age", "18");
	}
});

const Table = useTable<Data>(
	{
		contextMenu: [
			{
				label: "带图标",
				prefixIcon: EditPen
			},
			{
				label: "多层级",
				children: [
					{
						label: "A",
						children: [
							{
								label: "A-1"
							}
						]
					},
					{
						label: "B"
					}
				]
			}
		],

		columns: [
			{
				label: "姓名",
				prop: "name",
				search: {
					component: {
						name: "el-date-picker"
					}
				}
			},
			{
				label: "手机号",
				prop: "phone",
				search: {
					component: {
						name: "el-date-picker"
					}
				}
			},
			{
				type: "op"
			}
		]
	},
	(table) => {
		console.log(table);
	}
);

const Crud = useCrud(
	{
		service: "test"
	},
	(app) => {
		app.refresh();
	}
);

const Form = useForm<Data>();

const Search = useSearch({
	collapse: true,
	resetBtn: true,
	items: [
		{
			label: "姓名",
			prop: "name",
			component: {
				name: "el-input"
			},
			hook: {
				reset() {
					return [];
				}
			}
		}
	]
});
</script>

<style scoped>
.title {
	text-align: center;
	font-size: 14px;
	font-weight: bold;
}
</style>
