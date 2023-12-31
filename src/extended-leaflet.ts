import * as L from 'leaflet'

interface Cell {
    midX: number
    midY: number
    width: number
    height: number
}

export let ExtendSVG = L.SVG.extend({
    initialize: function (options: any) {
        // @ts-ignore
        L.SVG.prototype.initialize.call(this, options);
    },

    _initPath: function (layer: any) {
        L.SVG.prototype['_initPath'].call(this, layer);
        var label = layer._label = L.SVG.create('text');
        if (this._msie) {
            label['textContent'] = layer['_text'] ? layer['_text'] : 'W';
        } else {
            label.innerHTML = layer['_text'] ? layer['_text'] : 'W';
        }
    },
    _addPath: function (layer:any) {
        L.SVG.prototype['_addPath'].call(this, layer);
        this._rootGroup.appendChild(layer._label);
    },

    _removePath: function (layer:any) {
        L.SVG.prototype['_removePath'].call(this, layer);
        L.DomUtil.remove(layer._label);
    },

    _setStyle(layer: L.Layer & { _label: any }, style: { x: number, y: number, fontSize: number, opacity: number }) {
        let label = layer._label
        label.setAttribute('class', "geohash-cell-label")
        label.setAttribute('visibility', 'visible')

        label.setAttribute('x', style.x)
        label.setAttribute('y', style.y)

        label.setAttribute('text-anchor', 'middle')
        label.setAttribute('dominant-baseline', 'middle')
        label.setAttribute('font-size', style.fontSize)
        label.setAttribute('fill-opacity', style.opacity)
    },

    _updateLabel: function (layer: L.Layer & { _parts: string | any[], _label: { setAttribute: (arg0: string, arg1: string) => void } }) {
        if (layer._parts.length > 0) {
            let label = layer._label

            const cell: Cell = this._calcCell(layer._parts)
            // debug(`ExtendLeaflet._updateLabel() cell - '${label.innerHTML}',
            //         size: '${JSON.stringify(cell)}, parts: ${JSON.stringify(layer._parts)}`)
            if (cell.width > 300) {
                label.setAttribute('visibility', 'visible')

                label.setAttribute('x', cell.midX.toString())
                label.setAttribute('y', cell.midY.toString())

                label.setAttribute('text-anchor', 'middle')
                label.setAttribute('dominant-baseline', 'middle')
                label.setAttribute('font-size', '150')
                label.setAttribute('fill-opacity', "0.3")
                label.setAttribute('class', "geohash-cell-label")

            } else if (cell.width > 80) {
                label.setAttribute('visibility', 'visible')

                label.setAttribute('x', cell.midX.toString())
                label.setAttribute('y', cell.midY.toString())

                label.setAttribute('text-anchor', 'middle')
                label.setAttribute('dominant-baseline', 'middle')
                label.setAttribute('font-size', '50')
                label.setAttribute('fill-opacity', "0.6")
                label.setAttribute('class', "geohash-cell-label")

            } else if (cell.width > 24) {
                label.setAttribute('visibility', 'visible')

                label.setAttribute('x', cell.midX.toString())
                label.setAttribute('y', cell.midY.toString())

                label.setAttribute('text-anchor', 'middle')
                label.setAttribute('dominant-baseline', 'middle')
                label.setAttribute('font-size', '16')
                label.setAttribute('fill-opacity', "1.0")
                label.setAttribute('class', "geohash-cell-label")

            } else {
                label.setAttribute('visibility', 'hidden')
            }
        } else {
            layer._label.setAttribute('visibility', 'hidden')
        }
    },

    _updatePoly: function (layer: L.Layer & { _parts: L.PointExpression[], _label: any }, closed: boolean) {
        this._setPath(layer, L.SVG.pointsToPath(layer._parts, closed));
        this._updateLabel(layer)
    },

    _calcCell(_rings: any[]): Cell | null {
        var i, j, p1, p2, f, area, x, y,
            points = _rings[0],
            len = points.length;

        if (!len) { return null; }

        // polygon centroid algorithm; only uses the first ring if there are multiple
        area = x = y = 0;

        var minX, minY, maxX, maxY = 0

        for (i = 0, j = len - 1; i < len; j = i++) {
            if (i == 0) {
                minX = maxX = points[i].x
                minY = maxY = points[i].y
            } else {
                if (points[i].x > maxX) {
                    maxX = points[i].x
                }
                if (points[i].y > maxY) {
                    maxY = points[i].y
                }
                if (points[i].x < minX) {
                    minX = points[i].x
                }
                if (points[i].y < minY) {
                    minY = points[i].y
                }
            }

            p1 = points[i];
            p2 = points[j];

            f = p1.y * p2.x - p2.y * p1.x;
            x += (p1.x + p2.x) * f;
            y += (p1.y + p2.y) * f;
            area += f * 3;
        }

        var midX = 0, midY = 0, width = 0, height = 0
        if (area === 0) {
            // Polygon is so small that all points are on same pixel.
            midX = minY = points[0];
            width = height = 0
        } else {
            midX = x / area
            midY = y / area
            width = maxX - minX
            height = maxY - minY
        }
        return {
            midX, midY, width, height
        }
    }
})