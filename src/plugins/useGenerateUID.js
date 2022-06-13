export function useGenerateUID() {
	return () => {
		var uid = Date.now().toString();

		for (var i = 0; i < uid.length; i++) {
			var rand_int = Math.floor(Math.random() * (90 - 65)) + 65; // 65 is the charCode of "a" & 90 is the charCode of "z"
			var rand_int_0 = parseInt(rand_int.toString().charAt(1));

			if (rand_int_0 % 2 == 0) {
				uid = uid.replace(new RegExp(rand_int_0, 'g'), String.fromCharCode(rand_int));
			}
		}
		return uid;
	}
}