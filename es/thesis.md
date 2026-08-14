---
layout: default
title: "Tesis Doctoral"
lang: es
---
# Tesis Doctoral

## WeaFQAs: Un enfoque de Líneas de Productos de Software para la personalización y tejido de Atributos de Calidad Funcionales eficientes

> 🎓 **Sobresaliente «Cum Laude»** 🎓  
> 🌍 **Doctorado Internacional** 🌍  
> 🏆 **Premio Extraordinario de Doctorado** 🏆  
> 🏆 **Premio Nacional SISTEDES a la mejor Tesis Doctoral 2020** 🏆

---

## Información General

| :--- | :--- |
| **Título** | WeaFQAs: A Software Product Line approach for customizing and weaving efficient Functional Quality Attributes |
| **Autor** | José Miguel Horcas |
| **Directores** | Lidia Fuentes, Mónica Pinto |
| **Grupo de investigación** | CAOSD |
| **Departamento** | Departamento de Lenguajes y Ciencias de la Computación (LCC) |
| **Universidad** | Universidad de Málaga |
| **Financiación** | Beca de Formación de Personal Investigador (FPI) del Programa Excelencia EX14 79026815, proyecto P12-TIC-1814, financiado por la Consejería de Educación y Conocimiento de la Junta de Andalucía. |
| **Fecha** | 10 de julio de 2018 |
| **Identificadores** | TESEO, RIUMA |

<!-- * [Descargar tesis completa](#)
* [Descargar presentación](#) -->

### Cómo citar
José Miguel Horcas. WeaFQAs: A Software Product Line approach for customizing and weaving efficient Functional Quality Attributes. PhD Thesis. 2018. 
URL: [https://hdl.handle.net/10630/17231](https://hdl.handle.net/10630/17231)



# 📔 WeaFQAs en detalle

🛠️ **Soporte de herramienta oficial:** vEXgine

## Resumen

WeaFQAs es un proceso de Líneas de Productos de Software (*Software Product Line*, SPL) para gestionar la operacionalización de atributos de calidad o Atributos de Calidad Funcionales (*Functional Quality Attributes*, FQAs). WeaFQAs promueve el modelado de variabilidad y la personalización de los FQAs de forma independiente a las aplicaciones, así como su incorporación (*weaving* o tejido) en sus arquitecturas de software siguiendo un enfoque orientado a aspectos.

En WeaFQAs, el arquitecto de software puede seleccionar manualmente la configuración de cada FQA que satisfaga los requisitos de la aplicación, o generar automáticamente una configuración que optimice las propiedades no funcionales (*Non-Functional Properties*, NFPs), como la eficiencia energética o el rendimiento del FQA, basándose en el contexto de uso de la aplicación.

*El proceso WeaFQAs.*

---

## Atributos de Calidad Funcionales (FQAs)

Los atributos de calidad (*Quality Attributes*, QAs) tienen una influencia significativa en la arquitectura de software de una aplicación, sirviendo como criterio de selección entre diversos patrones de diseño e implementaciones alternativas. Para satisfacer los QAs de una aplicación, algunos de ellos (ej. seguridad, usabilidad) requieren introducir nuevos componentes funcionales en la arquitectura de software (ej. un componente de cifrado). Estas nuevas funcionalidades u operaciones (ej. el cifrado de un mensaje) que contribuyen a satisfacer QAs como la seguridad se denominan **operacionalizaciones de QAs** o **Atributos de Calidad Funcionales (FQAs)**.

### Ejemplos de FQAs

* **Cifrado** para proporcionar confidencialidad.
* **Hashing** para proporcionar integridad.
* **Autenticación** para proporcionar control de acceso.
* **Registro de actividad (*Logging*)** para proporcionar retroalimentación de transacciones.
* **Caché** para mejorar el rendimiento.
* **Compresión** para optimizar el uso de memoria.

---

## Los procesos de ingeniería de WeaFQAs

WeaFQAs sigue el marco clásico de la ingeniería de SPL y lo extiende para tener en cuenta la problemática específica de los FQAs. En WeaFQAs se definen cuatro procesos de ingeniería:

### Ingeniería del Dominio
Gestiona la complejidad y la variabilidad de los FQAs desde las fases tempranas del ciclo de vida del desarrollo. El objetivo es:
* Caracterizar los QAs y FQAs.
* Definir las variabilidades y puntos en común de los FQAs, incluyendo sus dependencias y componentes reutilizables.
* Analizar la influencia de las variantes de FQA sobre las propiedades no funcionales (NFPs).

### Ingeniería de la Aplicación
Genera configuraciones de FQA basándose en los requisitos específicos de la aplicación. El objetivo es vincular la variabilidad del FQA según las necesidades del proyecto, generando una configuración de producto de FQAs que cumpla dichos requisitos.

### Ingeniería de Tejido (*Weaving Engineering*)
Integra la configuración de la arquitectura de FQAs generada en el proceso anterior dentro de la arquitectura base de la aplicación. El objetivo es incorporar el modelo de arquitectura personalizado de los FQAs en la aplicación mediante la aplicación de los patrones de tejido adecuados.

### Ingeniería de Evolución
Gestiona los FQAs cuando los requisitos de la aplicación cambian o la tecnología de los FQAs evoluciona. El objetivo es actualizar los artefactos de los diferentes procesos de ingeniería en WeaFQAs y propagar los cambios a la aplicación final ya desplegada.

---

## WeaFQAs en detalle a través de sus publicaciones

Un total de 23 publicaciones científicas a lo largo de los 5 años de doctorado (2013-2018) respaldan la tesis WeaFQAs. A continuación se muestra un resumen de las principales publicaciones para ayudar a comprender cada contribución en el contexto de WeaFQAs:

* ◼️ **El enfoque WeaFQAs**  
  Define el enfoque de SPL orientado a aspectos de WeaFQAs, y compara y analiza dos implementaciones diferentes de WeaFQAs: (1) utilizando modelos CVL y UML; y (2) utilizando modelos de características tradicionales y un lenguaje de descripción arquitectónica orientado a aspectos (*AO-ADL*) específico.

* ◼️ **Extensión de WeaFQAs para optimizar Propiedades No Funcionales (NFPs)**  
  Extiende WeaFQAs para dar soporte al análisis de NFPs (ej. consumo energético, rendimiento) y ayudar a los desarrolladores a generar configuraciones óptimas de los FQAs de acuerdo con dichas propiedades.

* ◼️ **vEXgine: el soporte de herramienta oficial**  
  Presenta vEXgine, una implementación personalizable y extensible del motor de ejecución para el Lenguaje Común de Variabilidad (*Common Variability Language*, CVL), proporcionando soporte de herramientas para el enfoque WeaFQAs. Reconocido con el premio *Best Paper Award* en la sección de *Data, Demonstrations and Tools* de la conferencia SPLC'17.

* ◼️ **Implementación de WeaFQAs con CVL y UML**  
  Detalla la implementación principal de WeaFQAs utilizando el lenguaje CVL para especificar la variabilidad de los FQAs, UML para modelar la arquitectura de software de los FQAs, y CVL en combinación con ATL para tejer (*weave*) las configuraciones de los FQAs.

* ◼️ **Implementación de WeaFQAs con modelos de características y AO-ADL**  
  Detalla la primera implementación de WeaFQAs que utiliza modelos de características tradicionales para especificar la variabilidad de los FQAs, y el lenguaje AO-ADL para modelar las arquitecturas de software de los FQAs y tejer sus configuraciones.

* ◼️ **El proceso de tejido (*weaving*) en detalle**  
  Profundiza en los detalles de tejido de WeaFQAs, donde el proceso se implementa como transformaciones de modelos en ATL e integrado con el lenguaje CVL, ilustrándolo en el contexto del FQA de seguridad.

* ◼️ **Uso de WeaFQAs en tiempo de ejecución**  
  Una adaptación de WeaFQAs para dar soporte al tejido de FQAs en tiempo de ejecución (*runtime*). Los FQAs de seguridad como cifrado, hashing o autenticación se implementan como aspectos. Se presenta el diseño e implementación de los módulos *Aspect Generation* y *Aspect Weaver* en el marco del proyecto internacional INTER-TRUST.

* ◼️ **WeaFQAs para sistemas multiagente y el Internet de las Cosas (IoT)**  
  Una adaptación de la Línea de Productos de Software Dinámica (*Dynamic Software Product Line*, DSPL) de WeaFQAs para adaptar dinámicamente los objetivos y el comportamiento de agentes inteligentes en el contexto de IoT. Recibió el premio *Best Paper Award* en la conferencia MATES'16.

* ◼️ **WeaFQAs en el dominio automotriz**  
  Una adaptación de WeaFQAs para dar soporte a la reconfiguración de vehículos autónomos según el contexto del tráfico, mejorando los QAs del tráfico (ej. tiempo de viaje, tasa de cambio de carril, tiempo hasta la colisión).

* ◼️ **Evolución de configuraciones de FQAs**  
  Presenta algoritmos formales para automatizar la evolución de los modelos CVL, la actualización de los modelos de configuración y la propagación de cambios a las configuraciones de FQAs desplegadas en las aplicaciones.

* ◼️ **Configuraciones de FQAs ecológicas (*Green FQAs*)**  
  Optimización de las configuraciones de FQAs basada en el equilibrio (*trade-offs*) entre NFPs como la eficiencia energética y el rendimiento.