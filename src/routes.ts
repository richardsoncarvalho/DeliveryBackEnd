import { Router } from "express";
import { CreateClientController } from './modules/clients/useCases/createClients/CreateClientsController';
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { CreateDeliverymanController } from './modules/deliveryman/CreateDeliverymanController';
import { AuthenticateDeliverymanController } from './modules/account/authenticateDelivery/AuthenticateDeliverymanController';
import { CreateDeliveryController } from './modules/delivery/useCases/createDelivery/CreateDeliveryController';
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { FindAllAvaliableController } from './modules/delivery/useCases/findAllAvaliable/FindAllAvaliableController';
import { ensureAuthenticateDeliveryman } from './middlewares/ensureAuthenticateDeliveryman';
import { UpdateDeliverymanController } from './modules/delivery/useCases/updateDeliveryman/UpdateDeliverymanController';
import { FindAllDeliveriesController } from './modules/clients/useCases/findAllDeliveries/FindAllDeliveriesController';
import { FindAllDeliveriesDeliverymanController } from './modules/delivery/useCases/findAllDeliveriesDeliveryman/FindAllDeliveriesDeliverymanController';
import { UpdateEndDateController } from './modules/delivery/useCases/updateEndDate/UpdateEndDateController';

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController();

const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()

const createDeliveryController = new CreateDeliveryController()
const findAllAvaliableController = new FindAllAvaliableController()
const updateDeliverymanController = new UpdateDeliverymanController()
const findAllDeliveriesControllerClient = new FindAllDeliveriesController()
const findAllDeliveriesDeliverymanController = new FindAllDeliveriesDeliverymanController()
const updateEndDateController = new UpdateEndDateController()

const router = Router()

router.post("/client/", createClientController.handle);
router.post("/authenticate/", authenticateClientController.handle);

router.post("/deliveryman/", createDeliverymanController.handle);
router.post("/authenticatedeliveryman/", authenticateDeliverymanController.handle);

router.post("/delivery", ensureAuthenticateClient, createDeliveryController.handle)
router.get("/delivery/avaliable", ensureAuthenticateDeliveryman, findAllAvaliableController.handle)
router.put("/delivery/updateDeliveryman/:id", ensureAuthenticateDeliveryman, updateDeliverymanController.handle)

router.get("/client/deliveries", ensureAuthenticateClient, findAllDeliveriesControllerClient.handle)
router.get("/deliveryman/deliveries", ensureAuthenticateDeliveryman, findAllDeliveriesDeliverymanController.handle)
router.put("/delivery/updateEndDate/:id", ensureAuthenticateDeliveryman, updateEndDateController.handle)

export { router }