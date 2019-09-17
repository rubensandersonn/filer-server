var GeoPackageAPI = require("@ngageoint/geopackage"),
  GeoPackageManager = GeoPackageAPI.GeoPackageManager,
  GeoPackageConnection = GeoPackageAPI.GeoPackageConnection,
  GeoPackageTileRetriever = GeoPackageAPI.GeoPackageTileRetriever;

exports.handleGeopackage = filename => {
  GeoPackageAPI.open(filename, function(err, geoPackage) {
    // Now you can operate on the GeoPackage

    // get the tile table names
    geoPackage.getTileTables(function(err, tileTableNames) {
      // tileTableNames is an array of all tile table names

      // get the info for the first table
      geoPackage.getTileDaoWithTableName(tileTableNames[0], function(
        err,
        tileDao
      ) {
        geoPackage.getInfoForTable(tileDao, function(err, info) {
          // do something with the tile table info
          console.log(info)
        });

        // draw a tile into a canvas for an XYZ tile
        var canvas = canvasFromSomewhere;
        var gpr = new GeoPackageTileRetriever(tileDao, 256, 256);
        var x = 0;
        var y = 0;
        var zoom = 0;

        console.time("Draw tile " + x + ", " + y + " zoom: " + zoom);
        gpr.drawTileIn(x, y, zoom, canvas, function() {
          console.timeEnd("Draw tile " + x + ", " + y + " zoom: " + zoom);
        });

        // or get a tile base64 data URL for an XYZ tile
        gpr.getTile(x, y, zoom, function(err, tileBase64DataURL) {
          console.log("got the base64 data url");
        });

        // or get a tile from a GeoPackage tile column and tile row
        tileDao.queryForTile(tileColumn, tileRow, zoom, function(err, tile) {
          var tileData = tile.getTileData(); // the raw bytes from the GeoPackage
        });
      });
    });

    // get the feature table names
    geoPackage.getFeatureTables(function(err, featureTableNames) {
      // featureTableNames is an array of all feature table names

      // get the info for the first table
      geoPackage.getFeatureDaoWithTableName(featureTableNames[0], function(
        err,
        featureDao
      ) {
        geoPackage.getInfoForTable(featureDao, function(err, info) {
          // do something with the feature table info
        });

        // query for all features
        featureDao.queryForEach(function(err, row, rowDone) {
          var feature = featureDao.getFeatureRow(row);
          var geometry = currentRow.getGeometry();
          if (geometry) {
            var geom = geometry.geometry;
            var geoJson = geometry.geometry.toGeoJSON();

            geoJson.properties = {};
            for (var key in feature.values) {
              if (
                feature.values.hasOwnProperty(key) &&
                key != feature.getGeometryColumn().name
              ) {
                var column = info.columnMap[key];
                geoJson.properties[column.displayName] = currentRow.values[key];
              }
            }
          }
          rowDone();
        });
      });
    });
  });
};
