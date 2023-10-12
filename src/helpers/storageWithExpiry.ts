type Item = {
  value: string;
  expiry: number;
};

export function setItemWithExpiry(
  key: string,
  value: string,
  time: number
): void {
  const item: Item = {
    value,
    expiry: Date.now() + time,
  };

  localStorage.setItem(key, JSON.stringify(item));
}

export function getItemWithExpiry(key: string): string | null {
  const itemString = localStorage.getItem(key);
  if (!itemString) {
    return null;
  }
  const item: Item = JSON.parse(itemString);

  if (Date.now() - item.expiry > 0) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}
