import fs from "fs";

export function parseCsv(csvpath: string): string[] {
	const data = fs.readFileSync(csvpath, "utf-8");
	const lines = data.split("\n");
	const headers: string[] = lines[0].split(",");
	const transactions = lines.slice(1).map((line: string) => {
		const values: string[] = line.split(",");
		const row: any = {};

		headers.forEach((header: string, index: number) => {
			row[header] = values[index];
		});
		return row["txHash"];
	});
	const parsedHashes = transactions.filter((hash: string) => hash);
	return parsedHashes;
}
