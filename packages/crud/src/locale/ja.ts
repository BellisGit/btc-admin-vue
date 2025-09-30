/**
 * 日本語言語パック
 * BTC CRUD コンポーネントライブラリ日本語国際化設定
 */

export default {
	// 共通テキスト
	common: {
		confirm: '確認',
		cancel: 'キャンセル',
		save: '保存',
		delete: '削除',
		edit: '編集',
		add: '追加',
		search: '検索',
		reset: 'リセット',
		refresh: '更新',
		export: 'エクスポート',
		import: 'インポート',
		download: 'ダウンロード',
		upload: 'アップロード',
		preview: 'プレビュー',
		print: '印刷',
		close: '閉じる',
		back: '戻る',
		next: '次へ',
		previous: '前へ',
		submit: '送信',
		loading: '読み込み中...',
		noData: 'データなし',
		success: '成功',
		error: 'エラー',
		warning: '警告',
		info: '情報',
		yes: 'はい',
		no: 'いいえ',
		ok: 'OK'
	},

	// フォーム関連
	form: {
		required: 'この項目は必須です',
		invalid: '形式が正しくありません',
		tooLong: '長すぎます',
		tooShort: '短すぎます',
		tooBig: '大きすぎます',
		tooSmall: '小さすぎます',
		notMatch: '形式が一致しません',
		notEmail: '有効なメールアドレスを入力してください',
		notPhone: '有効な電話番号を入力してください',
		notUrl: '有効なURLを入力してください',
		notNumber: '数字を入力してください',
		notInteger: '整数を入力してください',
		notFloat: '小数を入力してください',
		notDate: '有効な日付を入力してください',
		notTime: '有効な時間を入力してください',
		notDateTime: '有効な日時を入力してください'
	},

	// テーブル関連
	table: {
		selection: '選択',
		index: 'インデックス',
		operation: '操作',
		noData: 'データなし',
		loading: '読み込み中...',
		total: '合計 {total} 件',
		page: '{page} ページ',
		size: '1ページ {size} 件',
		prevPage: '前へ',
		nextPage: '次へ',
		firstPage: '最初',
		lastPage: '最後',
		refresh: '更新',
		density: '密度',
		columnSetting: '列設定',
		fullscreen: 'フルスクリーン',
		exitFullscreen: 'フルスクリーン終了'
	},

	// 検索関連
	search: {
		placeholder: '検索キーワードを入力してください',
		advanced: '高度な検索',
		simple: 'シンプル検索',
		search: '検索',
		reset: 'リセット',
		expand: '展開',
		collapse: '折りたたみ'
	},

	// ダイアログ関連
	dialog: {
		title: 'タイトル',
		confirm: '確認',
		cancel: 'キャンセル',
		close: '閉じる',
		maximize: '最大化',
		restore: '復元',
		minimize: '最小化'
	},

	// メニュー関連
	menu: {
		dashboard: 'ダッシュボード',
		system: 'システム管理',
		user: 'ユーザー管理',
		role: 'ロール管理',
		permission: '権限管理',
		menu: 'メニュー管理',
		dept: '部門管理',
		dict: '辞書管理',
		config: '設定管理',
		log: 'ログ管理',
		monitor: 'システム監視'
	},

	// 権限関連
	permission: {
		denied: '権限がありません',
		login: 'ログイン',
		logout: 'ログアウト',
		unauthorized: '認証されていません',
		forbidden: 'アクセス禁止'
	},

	// エラー関連
	error: {
		networkError: 'ネットワークエラー',
		serverError: 'サーバーエラー',
		timeout: 'リクエストタイムアウト',
		notFound: 'ページが見つかりません',
		unauthorized: '認証されていないアクセス',
		forbidden: 'アクセス禁止',
		internalError: '内部エラー'
	},

	// 時間関連
	time: {
		today: '今日',
		yesterday: '昨日',
		tomorrow: '明日',
		thisWeek: '今週',
		lastWeek: '先週',
		nextWeek: '来週',
		thisMonth: '今月',
		lastMonth: '先月',
		nextMonth: '来月',
		thisYear: '今年',
		lastYear: '昨年',
		nextYear: '来年',
		justNow: 'たった今',
		minutesAgo: '{minutes} 分前',
		hoursAgo: '{hours} 時間前',
		daysAgo: '{days} 日前',
		weeksAgo: '{weeks} 週前',
		monthsAgo: '{months} ヶ月前',
		yearsAgo: '{years} 年前'
	},

	// CRUD関連
	crud: {
		addSuccess: '追加成功',
		editSuccess: '編集成功',
		deleteSuccess: '削除成功',
		confirmDelete: 'このレコードを削除してもよろしいですか？',
		confirmBatchDelete: '選択された {count} 件のレコードを削除してもよろしいですか？',
		selectRecords: '操作するレコードを選択してください',
		noRecordsSelected: 'レコードが選択されていません',
		operationSuccess: '操作成功',
		operationFailed: '操作失敗',
		loadDataFailed: 'データ読み込み失敗',
		saveDataFailed: 'データ保存失敗',
		deleteDataFailed: 'データ削除失敗'
	}
};
