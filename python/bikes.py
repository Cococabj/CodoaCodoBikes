from flask import Flask ,jsonify ,request
# del modulo flask importar la clase Flask y los métodos jsonify,request
from flask_cors import CORS       # del modulo flask_cors importar CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
bikes=Flask(__name__)  # crear el objeto app de la clase Flask
CORS(bikes) #modulo cors es para que me permita acceder desde el frontend al backend

# configuro la base de datos, con el nombre el usuario y la clave
bikes.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:root@localhost/bikes'
# URI de la BBDD                          driver de la BD  user:clave@URLBBDD/nombreBBDD
bikes.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False #none
db= SQLAlchemy(bikes)   #crea el objeto db de la clase SQLAlquemy
ma=Marshmallow(bikes)   #crea el objeto ma de de la clase Marshmallow

# defino la tabla
class Producto(db.Model):   # la clase Producto hereda de db.Model    
    id=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    type=db.Column(db.String(100))
    total_length_cm=db.Column(db.String(100))
    wheel_size_inches=db.Column(db.String(100))
    comment=db.Column(db.String(4000))
    image=db.Column(db.String(400))
    precio=db.Column(db.Integer)
    def __init__(self,type,total_length_cm,wheel_size_inches,comment,image,precio):   #crea el  constructor de la clase
        self.type=type   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.total_length_cm=total_length_cm
        self.wheel_size_inches=wheel_size_inches
        self.comment=comment
        self.image=image
        self.precio=precio
    #  si hay que crear mas tablas , se hace aqui

with bikes.app_context():
    db.create_all()  # aqui crea todas las tablas
#  ************************************************************
class ProductoSchema(ma.Schema):
    class Meta:
        fields=('id','type','total_length_cm','wheel_size_inches','comment','image','precio')

producto_schema=ProductoSchema()            # El objeto producto_schema es para traer un producto
productos_schema=ProductoSchema(many=True)  # El objeto productos_schema es para traer multiples registros de producto

# crea los endpoint o rutas (json)
@bikes.route('/productos',methods=['GET'])
def get_Productos():
    all_productos=Producto.query.all()         # el metodo query.all() lo hereda de db.Model
    result=productos_schema.dump(all_productos)  # el metodo dump() lo hereda de ma.schema y
                                                 # trae todos los registros de la tabla
    return jsonify(result)                       # retorna un JSON de todos los registros de la tabla

@bikes.route('/productos/<id>',methods=['GET'])
def get_producto(id):
    producto=Producto.query.get(id)
    return producto_schema.jsonify(producto)   # retorna el JSON de un producto recibido como parametro

@bikes.route('/productos/<id>',methods=['DELETE'])
def delete_producto(id):
    producto=Producto.query.get(id)
    db.session.delete(producto)
    db.session.commit()
    return producto_schema.jsonify(producto)   # me devuelve un json con el registro eliminado

@bikes.route('/productos', methods=['POST']) # crea ruta o endpoint
def create_producto():
    #print(request.json)  # request.json contiene el json que envio el cliente
    type=request.json['type']
    total_length_cm=request.json['total_length_cm']
    wheel_size_inches=request.json['wheel_size_inches']
    comment=request.json['comment']
    image=request.json['image']
    precio=request.json['precio']
    new_producto=Producto(type,total_length_cm,wheel_size_inches,comment,image,precio)
    db.session.add(new_producto)
    db.session.commit()
    return producto_schema.jsonify(new_producto)

@bikes.route('/productos/<id>' ,methods=['PUT'])
def update_producto(id):
    producto=Producto.query.get(id)

    type=request.json['type']
    total_length_cm=request.json['total_length_cm']
    wheel_size_inches=request.json['wheel_size_inches']
    comment=request.json['comment']
    image=request.json['image']
    precio=request.json['precio']

    producto.type=type
    producto.total_length_cm=total_length_cm
    producto.stwheel_size_inchesock=wheel_size_inches
    producto.comment=comment
    producto.image=image
    producto.precio=precio

    db.session.commit()
    return producto_schema.jsonify(producto)

# programa principal *******************************
if __name__=='__main__':  
    bikes.run(debug=True, port=5000)    # ejecuta el servidor Flask en el puerto 5000
