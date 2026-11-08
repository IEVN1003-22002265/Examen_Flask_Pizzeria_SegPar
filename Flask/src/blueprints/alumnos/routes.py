from flask import Blueprint, jsonify, request

pedidos_bp = Blueprint(
    'pedidos',
    __name__,
    url_prefix='/api/pedidos'
)

def fila_a_diccionario(cursor, fila):
    columnas = [columna[0] for columna in cursor.description]
    return dict(zip(columnas, fila))

@pedidos_bp.route("/", methods=['GET'])
def lista_pedidos():
    from database import mysql
    try:
        cursor = mysql.connection.cursor()
        sql = "SELECT idpedido, nombreCompleto, direccion, telefono, fechaCompra, totalPedido FROM pedidos"
        cursor.execute(sql)
        datos = cursor.fetchall()
        pedidos = []
        for fila in datos:
            pedido = {
                "idpedido": fila[0],
                "nombreCompleto": fila[1],
                "direccion": fila[2],
                "telefono": fila[3],
                "fechaCompra": str(fila[4]) if fila[4] else "",
                "totalPedido": float(fila[5]) if fila[5] else 0.0
            }
            pedidos.append(pedido)
        return jsonify({'pedidos': pedidos, 'mensaje': "Lista de pedidos", 'exito': True}), 200
    except Exception as ex:
        return jsonify({"mensaje": "error {}".format(ex), 'exito': False}), 500

@pedidos_bp.route("/", methods=['POST'])
def registrar_pedido():
    from database import mysql
    datos = request.get_json(silent=True)
    if not isinstance(datos, dict):
        return jsonify({'mensaje': 'Se requiere un objeto JSON', 'exito': False}), 400
    
    try:
        cursor = mysql.connection.cursor()
        sql = """
            INSERT INTO pedidos (nombreCompleto, direccion, telefono, fechaCompra, totalPedido)
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (
            datos.get('nombreCompleto'),
            datos.get('direccion'),
            datos.get('telefono'),
            datos.get('fechaCompra'),
            datos.get('totalPedido')
        ))
        mysql.connection.commit()
        return jsonify({'mensaje': 'Pedido registrado correctamente', 'exito': True}), 201
    except Exception as ex:
        mysql.connection.rollback()
        return jsonify({'mensaje': 'Error al registrar el pedido: {}'.format(ex), 'exito': False}), 500
    finally:
        if cursor:
            cursor.close()