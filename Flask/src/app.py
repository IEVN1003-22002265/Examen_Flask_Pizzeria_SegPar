from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS
from config import config

app = Flask(__name__)
CORS(app)

con = MySQL(app)

@app.route("/api/pedidos/", methods=['GET'])
def lista_pedidos():
    cursor = None
    try:
        cursor = con.connection.cursor()
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
        return jsonify({"mensaje": "Error al consultar los pedidos: {}".format(ex), 'exito': False}), 500
    finally:
        if cursor:
            cursor.close()

@app.route("/api/pedidos/<int:idpedido>", methods=['GET'])
def leer_pedido_bd(idpedido):
    cursor = None
    try:
        cursor = con.connection.cursor()
        cursor.execute("SELECT idpedido, nombreCompleto, direccion, telefono, fechaCompra, totalPedido FROM pedidos WHERE idpedido = %s", (idpedido,))
        fila = cursor.fetchone()
        if fila is None:
            return jsonify({'mensaje': 'Pedido no encontrado', 'exito': False}), 404
        
        pedido = {
            "idpedido": fila[0],
            "nombreCompleto": fila[1],
            "direccion": fila[2],
            "telefono": fila[3],
            "fechaCompra": str(fila[4]) if fila[4] else "",
            "totalPedido": float(fila[5]) if fila[5] else 0.0
        }
        return jsonify({'pedido': pedido, 'exito': True}), 200
    except Exception as ex:
        return jsonify({'mensaje': 'Error al consultar el pedido: {}'.format(ex), 'exito': False}), 500
    finally:
        if cursor:
            cursor.close()

@app.route("/api/pedidos/", methods=['POST'])
def registrar_pedido():
    datos = request.get_json(silent=True)
    if not isinstance(datos, dict):
        return jsonify({'mensaje': 'Se requiere un objeto JSON', 'exito': False}), 400
    
    campos = ['nombreCompleto', 'direccion', 'telefono', 'fechaCompra', 'totalPedido']
    if any(campo not in datos for campo in campos):
        return jsonify({'mensaje': 'Faltan campos obligatorios', 'exito': False}), 400

    cursor = None
    try:
        cursor = con.connection.cursor()
        sql = """
            INSERT INTO pedidos (nombreCompleto, direccion, telefono, fechaCompra, totalPedido)
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (
            datos.get('nombreCompleto').strip(),
            datos.get('direccion').strip(),
            datos.get('telefono').strip(),
            datos.get('fechaCompra').strip(),
            datos.get('totalPedido')
        ))
        con.connection.commit()
        return jsonify({'mensaje': 'Pedido registrado correctamente', 'exito': True}), 201
    except Exception as ex:
        con.connection.rollback()
        return jsonify({'mensaje': 'Error al registrar el pedido: {}'.format(ex), 'exito': False}), 500
    finally:
        if cursor:
            cursor.close()

@app.route("/api/pedidos/<int:idpedido>", methods=['DELETE'])
def eliminar_pedido(idpedido):
    cursor = None
    try:
        cursor = con.connection.cursor()
        cursor.execute("SELECT idpedido FROM pedidos WHERE idpedido = %s", (idpedido,))
        pedido = cursor.fetchone()
        if not pedido:
            return jsonify({"mensaje": "No existe un pedido con ese ID", 'exito': False}), 404
        
        cursor.execute("DELETE FROM pedidos WHERE idpedido = %s", (idpedido,))
        con.connection.commit()
        return jsonify({"mensaje": "Pedido eliminado correctamente", "idpedido": idpedido, 'exito': True}), 200
    except Exception as e:
        con.connection.rollback()
        return jsonify({'mensaje': 'Error al eliminar el pedido', 'error': str(e), 'exito': False}), 500
    finally:
        if cursor:
            cursor.close()

def pagina_no_encontrada(error):
    return "<h1> Pagina no encontrada </h1>", 404

if __name__ == "__main__":
    app.config.from_object(config['development'])
    app.register_error_handler(404, pagina_no_encontrada)
    app.run(host='0.0.0.0', port=5000)