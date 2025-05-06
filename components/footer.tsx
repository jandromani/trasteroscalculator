import { Building2, Mail, Phone, MapPin, FileText, Calendar, User, HardHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-200">
      <div className="container px-4 py-16 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="w-8 h-8 text-orange-500" />
              <h3 className="text-2xl font-bold">Trasteros Pro</h3>
            </div>
            <p className="mb-6 text-gray-400">
              Somos especialistas en la construcción de trasteros a medida, cumpliendo con todas las normativas y
              ofreciendo la mejor calidad a precios competitivos.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500" />
                <span>+34 612 345 678</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500" />
                <span>info@trasterospro.es</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span>C/ Ejemplo 123, 28001 Madrid</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-6 text-2xl font-bold">Solicite Su Presupuesto Personalizado</h3>
            <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-gray-300">
                  Nombre
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="w-4 h-4 text-gray-500" />
                  </div>
                  <Input
                    id="nombre"
                    type="text"
                    placeholder="Nombre completo"
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-4 h-4 text-gray-500" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Su email"
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono" className="text-gray-300">
                  Teléfono
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Phone className="w-4 h-4 text-gray-500" />
                  </div>
                  <Input
                    id="telefono"
                    type="tel"
                    placeholder="Teléfono de contacto"
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="urgencia" className="text-gray-300">
                  Urgencia del proyecto
                </Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Seleccione urgencia" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="alta">Alta - Necesito presupuesto urgente</SelectItem>
                    <SelectItem value="media">Media - En los próximos 15 días</SelectItem>
                    <SelectItem value="baja">Baja - En los próximos 1-3 meses</SelectItem>
                    <SelectItem value="informativa">Solo información</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo-proyecto" className="text-gray-300">
                  Tipo de proyecto
                </Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Seleccione tipo de proyecto" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="garaje">Trasteros en garaje</SelectItem>
                    <SelectItem value="local">Trasteros en local comercial</SelectItem>
                    <SelectItem value="nave">Trasteros en nave industrial</SelectItem>
                    <SelectItem value="vivienda">Trasteros en edificio residencial</SelectItem>
                    <SelectItem value="otro">Otro tipo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ubicacion" className="text-gray-300">
                  Ubicación del proyecto
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MapPin className="w-4 h-4 text-gray-500" />
                  </div>
                  <Input
                    id="ubicacion"
                    type="text"
                    placeholder="Ciudad o provincia"
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fecha-contacto" className="text-gray-300">
                  Mejor fecha para contacto
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Calendar className="w-4 h-4 text-gray-500" />
                  </div>
                  <Input id="fecha-contacto" type="date" className="pl-10 bg-gray-800 border-gray-700 text-white" />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="detalles" className="text-gray-300">
                  Detalles del proyecto
                </Label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <FileText className="w-4 h-4 text-gray-500" />
                  </div>
                  <Textarea
                    id="detalles"
                    placeholder="Describa su proyecto: número aproximado de trasteros, tamaño, requisitos especiales..."
                    className="min-h-[120px] pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center gap-2">
                  <HardHat className="w-5 h-5" />
                  Solicitar Presupuesto Personalizado
                </Button>
                <p className="mt-3 text-xs text-center text-gray-500">
                  Al enviar este formulario, acepta nuestra política de privacidad y el tratamiento de sus datos para
                  responder a su solicitud. Nos pondremos en contacto con usted en 24-48 horas laborables.
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="pt-8 mt-12 text-sm text-center text-gray-400 border-t border-gray-800">
          <p>© {new Date().getFullYear()} Trasteros Pro. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
