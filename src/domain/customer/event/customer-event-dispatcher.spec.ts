import CustomerCreatedEvent from "./customer-created.event";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import SendConsoleLog1Handler from "./handler/send-console-log-2.handler";
import SendConsoleLog2Handler from "./handler/send-console-log-1.handler";
import SendConsoleLog3Handler from "./handler/send-console-log-3.handler";
import CustomerChangedAddressEvent from "./customer-changed-address.event";

describe("Customer events tests", () => {

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog1Handler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();
    const eventHandler3 = new SendConsoleLog3Handler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler3);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][2]
    ).toMatchObject(eventHandler3);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeUndefined();
  });

  describe("CustomerCreatedEvent", () => {
    it("should register two event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler1 = new SendConsoleLog1Handler();
      const eventHandler2 = new SendConsoleLog2Handler();

      eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
      eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeDefined();
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
        2
      );
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(eventHandler1);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
      ).toMatchObject(eventHandler2);
    });

    it("should notify all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler1 = new SendConsoleLog1Handler();
      const eventHandler2 = new SendConsoleLog2Handler();

      const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
      const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
  
      eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
      eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
  
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(eventHandler1);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
      ).toMatchObject(eventHandler2);
  
      const customerCreatedEvent = new CustomerCreatedEvent({
        name: "Padaria São Bento",
        cnpj: "43250561000151",
      });
  
      eventDispatcher.notify(customerCreatedEvent);
  
      expect(spyEventHandler1).toHaveBeenCalled();
      expect(spyEventHandler2).toHaveBeenCalled();
    });
  })
  
  describe("CustomerChangedAddressEvent", () => {
    it("should register an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendConsoleLog3Handler();

      eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]
      ).toBeDefined();
      expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"].length).toBe(
        1
      );
      expect(
        eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]
      ).toMatchObject(eventHandler);
    });

    it("should notify all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendConsoleLog3Handler();

      const spyEventHandler = jest.spyOn(eventHandler, "handle");
  
      eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);
  
      expect(
        eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]
      ).toMatchObject(eventHandler);
  
      const customerChangedAddressEvent = new CustomerChangedAddressEvent({
        id: 1,
        name: 'Padaria São Bento',
        fullAddress: 'Rua João Mendes Peixoto, 32 - Jd. Mirian - São Paulo - SP'
      });
  
      eventDispatcher.notify(customerChangedAddressEvent);
  
      expect(spyEventHandler).toHaveBeenCalled();
    });
  })
});
