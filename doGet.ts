function doGet(e: GoogleAppsScript.Events.DoGet) {
  const params = e.parameter as {
    mainFolderId: string;
  };

  const mainFolder = DriveApp.getFolderById(params.mainFolderId);

  if (!mainFolder)
    return ContentService.createTextOutput(
      JSON.stringify({ error: "Main folder not found" })
    ).setMimeType(ContentService.MimeType.JSON);

  const subfolders = mainFolder.getFolders();

  const returnObj = {
    fulfillmentHqFolderId: "",
  };

  while (subfolders.hasNext()) {
    const folder = subfolders.next();
    const folderName = folder.getName();

    if (folderName.indexOf("Headquarters") > -1) {
      returnObj.fulfillmentHqFolderId = folder.getId();
    }
  }

  return ContentService.createTextOutput(JSON.stringify(returnObj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
