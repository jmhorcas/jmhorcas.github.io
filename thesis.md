---
layout: default
title: "Ph.D. Thesis"
lang: en
permalink: /thesis/
---
# Ph.D. Thesis

## WeaFQAs: A Software Product Line approach for customizing and weaving efficient Functional Quality Attributes

> 🎓 **Sobresaliente «Cum Laude»** 🎓  
> 🌍 **International Ph.D.** 🌍  
> 🏆 **Premio Extraordinario Doctorado** 🏆  
> 🏆 **Premio Nacional SISTEDES a la mejor Tesis Doctoral 2020** 🏆

---

## General Information

| :--- | :--- |
| **Title** | WeaFQAs: A Software Product Line approach for customizing and weaving efficient Functional Quality Attributes |
| **Author** | José Miguel Horcas |
| **Supervisors** | Lidia Fuentes, Mónica Pinto |
| **Research Group** | CAOSD |
| **Department** | Departamento de Lenguajes y Ciencias de la Computación (LCC) |
| **University** | Universidad de Málaga |
| **Funding** | Beca de Formación de Personal Investigador (FPI) del Programa Excelencia EX14 79026815, project P12-TIC-1814, funded by Conserjería de Educación y Conocimiento de la Junta de Andalucía. |
| **Date** | 10th July 2018 |
| **Handle** | TESEO, RIUMA |

<!-- * [Download full thesis](#)
* [Download presentation](#) -->

### How to Cite
José Miguel Horcas. WeaFQAs: A Software Product Line approach for customizing and weaving efficient Functional Quality Attributes. PhD Thesis. 2018. 
URL: [https://hdl.handle.net/10630/17231](https://hdl.handle.net/10630/17231)



# 📔 WeaFQAs in Detail

🛠️ **Official tool support:** vEXgine

## Summary

WeaFQAs is a Software Product Line (SPL) process to manage operationalizations of quality attributes or Functional Quality Attributes (FQAs). WeaFQAs promotes the variability modeling and customization of FQAs separately from the applications, and their incorporation (weaving) into their software architectures following an aspect-oriented approach.

In WeaFQAs, the software architect can manually select the configuration of each FQA that satisfies the application's requirements, or can automatically generate a configuration that optimizes the non-functional properties (NFPs), such as energy efficiency or performance, of the FQA based on the usage context of the application.

*The WeaFQAs process.*

---

## Functional Quality Attributes (FQAs)

Quality attributes (QAs) have a significant influence on the software architecture of an application, serving as selection criteria to choose from several alternative design patterns and implementations. To satisfy the QAs of an application, some of them (e.g., security, usability) require introducing new functional components into the software architecture of the application (e.g., an encryption component). These new functionalities or operations (e.g., the encryption of a message) that contribute to satisfy QAs such as security are called **operationalizations of QAs** or **Functional Quality Attributes (FQAs)**.

### Examples of FQAs

* **Encryption** to provide confidentiality.
* **Hashing** to provide integrity.
* **Authentication** to provide access control.
* **Logging** to provide feedback of transactions.
* **Caching** to improve performance.
* **Compression** to improve memory usage.

---

## The WeaFQAs Engineering Processes

WeaFQAs follows the classic framework for SPL engineering and extends it to take into account the specific problematic of FQAs. In WeaFQAs, four engineering processes are defined:

### Domain Engineering
Manages the complexity and the variability of the FQAs from the early stages of the development life cycle. The goal is:
* To characterize the QAs and FQAs.
* To define the commonalities and the variability of the FQAs including their dependencies and reusable components.
* To analyze the influence of the FQA variants over non-functional properties (NFPs).

### Application Engineering
Generates FQA configurations based on the specific application's requirements. The goal is to bind the FQA variability according to the application requirements, generating a product configuration of the FQAs that fulfills those requirements.

### Weaving Engineering
Integrates the FQAs architecture configuration generated in the previous process into the core architecture of the application being built. The goal is to incorporate the customized architecture model of the FQAs into the base application by applying the appropriate weaving patterns.

### Evolution Engineering
Manages the FQAs when the requirements of the application change and/or the technology of the FQAs evolves. The goal is to update the artifacts of the different engineering processes in the WeaFQAs approach and propagate the changes to the final application already deployed.

---

## WeaFQAs in Detail Through its Publications

A total of 23 scientific publications along the 5 years of PhD (2013-2018) support the WeaFQAs thesis. The following is a summary of the main publications to help understand each contribution in the context of WeaFQAs:

* ◼️ **The WeaFQAs approach**  
  Defines the Aspect-Oriented SPL approach of WeaFQAs, and compares and discusses two different implementations of WeaFQAs: (1) using CVL and UML models; and (2) using traditional feature models and a specific Aspect-Oriented architectural description language (AO-ADL).

* ◼️ **Extending WeaFQAs to optimize Non-Functional Properties (NFPs)**  
  Extends WeaFQAs to support the analysis of NFPs (e.g., energy consumption, performance) and to assist practitioners in generating optimum configurations of the FQAs according to those NFPs.

* ◼️ **vEXgine: the official tool support**  
  Presents vEXgine, a customizable and extensible implementation of the execution engine for the Common Variability Language (CVL), providing tool support for the WeaFQAs approach. Recognized with the "Best Paper Award" in the Data, Demonstrations and Tools track of the SPLC'17 conference.

* ◼️ **Implementing WeaFQAs with CVL and UML**  
  Details the main implementation of WeaFQAs by using the CVL language to specify the variability of the FQAs, UML to model the software architecture of the FQAs, and CVL in combination with ATL to weave the configurations of the FQAs.

* ◼️ **Implementing WeaFQAs with feature models and AO-ADL**  
  Details the first implementation of WeaFQAs that uses traditional feature models to specify the variability of the FQAs, and the AO-ADL language to model the software architectures of the FQAs and weave their configurations.

* ◼️ **The weaving process in detail**  
  Goes deeper into the weaving details of WeaFQAs where weaving is implemented as model transformations in ATL and integrated with the CVL language, illustrated in the context of the security FQA.

* ◼️ **Using WeaFQAs at runtime**  
  An adaptation of WeaFQAs to support the weaving of FQAs at runtime. Security FQAs like encryption, hashing, or authentication are implemented as aspects. The design and implementation of an Aspect Generation and an Aspect Weaver module is presented in the context of the international project INTER-TRUST.

* ◼️ **WeaFQAs for multi-agent systems and the Internet of Things (IoT)**  
  An adaptation of the Dynamic Software Product Line (DSPL) of WeaFQAs to dynamically adapt the goals and behaviour of intelligent agents in the context of IoT. Received the "Best Paper Award" in the MATES'16 conference.

* ◼️ **WeaFQAs in the automotive domain**  
  An adaptation of WeaFQAs to support reconfiguration of autonomous vehicles according to traffic context, improving traffic QAs (e.g., travel time, lane change rate, time to collisions).

* ◼️ **Evolving FQAs configurations**  
  Presents formal algorithms to automate the evolution of CVL models, updating configuration models, and propagating changes to the FQAs configurations deployed within applications.

* ◼️ **Green FQAs configurations**  
  Optimization of FQAs configurations based on trade-offs between NFPs like energy efficiency and performance.