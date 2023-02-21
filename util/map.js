export function getMapPreview(lat, lon) {
  const imagePreviewUrl = `https://www.mapquestapi.com/staticmap/v5/map?key=IrMbXl2kUpKHYGJK2JD8GtfDzyKYIX8w&size=350,190&zoom=14&center=${lat},${lon}&locations=${lat},${lon}`;
  return imagePreviewUrl;
}
