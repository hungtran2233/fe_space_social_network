export const formatStringForNews = (inputString) => {
	// Bỏ dấu tiếng Việt và chuyển đổi thành chữ thường
	const withoutDiacritics = inputString
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/đ/g, "d")
		.replace(/Đ/g, "D")
		.toLowerCase();

	// Thay thế dấu cách bằng dấu gạch dưới và giới hạn độ dài là 10 ký tự
	const formattedString = withoutDiacritics.replace(/\s+/g, "_").substring(0, 20);

	return formattedString;
};
