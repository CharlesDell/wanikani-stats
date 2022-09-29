export function primaryColors(index: number): string {
  const primary = [
    "rgb(252, 228, 244)",
    // "rgb(249, 186, 228)",
    // "rgb(249, 139, 210)",
    // "rgb(251, 84, 189)",
    // "rgb(255, 0, 170)",
    // "rgb(255, 0, 148)",
    // "rgb(242, 0, 143)",
    // "rgb(218, 0, 137)",
    // "rgb(195, 0, 132)",
    "rgb(152, 0, 124)",
  ];
  return primary[index];
}

export function secondaryColors(index: number): string {
  const secondary = [
    "rgb(225, 245, 255)",
    // "rgb(179, 229, 255)",
    // "rgb(129, 213, 255)",
    // "rgb(77, 196, 255)",
    // "rgb(36, 183, 255)",
    // "rgb(0, 170, 255)",
    // "rgb(7, 156, 239)",
    // "rgb(12, 137, 219)",
    // "rgb(11, 119, 199)",
    "rgb(13, 87, 164)",
  ];
  return secondary[index];
}
