import {Component, Input, OnChanges} from "@angular/core";
import {Crawlconfig, CrawlconfigService } from "../";
import {PolitenessconfigService, Politenessconfig} from "../../politenessconfig/";
import {Browserconfig, BrowserconfigService} from "../../browserconfig/";
import {Label, CustomValidators} from "../../../commons/";
import {FormGroup, FormBuilder, FormArray, Validators} from "@angular/forms";
import {MdlSnackbarService} from "angular2-mdl";


@Component({
  selector: 'crawlconfig-details',
  templateUrl: './crawlconfig-details.component.html',
  styleUrls: ['./crawlconfig-details.component.css'],
  //encapsulation: ViewEncapsulation.None,

})
export class CrawlconfigDetailsComponent implements OnChanges {
  @Input()
  crawlconfig: Crawlconfig;
  crawlconfigForm: FormGroup;

  browserconfig: Browserconfig;
  politenessconfig: Politenessconfig;
  browserconfigList: any = [];
  politenessconfigList: any = [];

  selectedBrowserconfigItems = [];
  dropdownBrowserconfigSettings = {};
  dropdownPolitenessconfigSettings = {};
  selectedPolitenessconfigItems = [];

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private crawlconfigService: CrawlconfigService,
              private politenessconfigService: PolitenessconfigService,
              private browserconfigService: BrowserconfigService,
              private fb: FormBuilder,
              private mdlSnackbarService: MdlSnackbarService,) {
    this.filldropdown();
    this.createForm();
  }


  createForm() {
    this.crawlconfigForm = this.fb.group({
      id: {value: '', disabled: true},
      browser_config_id: ['', CustomValidators.nonEmpty],
      politeness_id: ['', CustomValidators.nonEmpty],
      extra: this.fb.group({
        extract_text: true,
        create_snapshot: '',
      }),
      minimum_dns_ttl_s: ['', [Validators.required, CustomValidators.min(0)]],
      depth_first: '',
      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: '',
        created: this.fb.group({seconds: {value: '', disabled: true,}}),
        created_by: {value: '', disabled: true},
        last_modified: this.fb.group({seconds: {value: '', disabled: true}}),
        last_modified_by: {value: '', disabled: true},
        label: this.fb.array([]),
      }),
    });
  }

  updateData(crawlconfig: Crawlconfig) {
    this.crawlconfigForm.controls['id'].setValue(crawlconfig.id);
    this.crawlconfigForm.controls['extra'].setValue({
      extract_text: crawlconfig.extra.extract_text,
      create_snapshot: crawlconfig.extra.create_snapshot,
    });
    this.crawlconfigForm.controls['minimum_dns_ttl_s'].setValue(crawlconfig.minimum_dns_ttl_s);
    this.crawlconfigForm.controls['depth_first'].setValue(crawlconfig.depth_first);
    this.crawlconfigForm.controls['meta'].patchValue({
      name: crawlconfig.meta.name as string,
      description: crawlconfig.meta.description as string,
    });
    this.setSelectedDropdown();
  }

  ngOnChanges() {
    this.selectedPolitenessconfigItems = [];
    this.selectedBrowserconfigItems = [];
    this.setLabel(this.crawlconfig.meta.label);

    //what the bug?! pre-filled radiobuttons aint working without this.
    setTimeout(() => {
      this.updateData(this.crawlconfig);
    });
  }


  createCrawlconfig() {
    this.crawlconfig = this.prepareSaveCrawlconfig();
    this.crawlconfigService.createCrawlconfig(this.crawlconfig).then((newCrawlconfig: Crawlconfig) => {
      this.createHandler(newCrawlconfig);
    });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret'
      });
  }

  updateCrawlconfig(crawlconfigForm): void {
    this.crawlconfig = this.prepareSaveCrawlconfig();
    this.crawlconfigService.updateCrawlconfig(this.crawlconfig)
      .then((updatedCrawlconfig) => {
        this.updateHandler(updatedCrawlconfig);
      });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret',
      });
  };

  deleteCrawlconfig(crawlconfigId): void {
    this.crawlconfigService.deleteCrawlconfig(crawlconfigId)
      .then((deletedCrawlconfig) => {
        this.deleteHandler(deletedCrawlconfig);
        if (deletedCrawlconfig === "not_allowed") {
          this.mdlSnackbarService.showSnackbar(
            {
              message: 'Feil: Ikke slettet',
            });
        } else {
          this.mdlSnackbarService.showSnackbar(
            {
              message: 'Slettet',
            });
        }
      });
  }

  prepareSaveCrawlconfig(): Crawlconfig {
    const formModel = this.crawlconfigForm.value;

    const labelsDeepCopy: Label[] = formModel.label.map(
      (label: Label) => Object.assign({}, label)
    );

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveCrawlconfig: Crawlconfig = {
      id: this.crawlconfig.id,
      browser_config_id: formModel.browser_config_id[0].id as string,
      politeness_id: formModel.politeness_id[0].id as string,
      extra: {
        extract_text: formModel.extra.extract_text as boolean,
        create_snapshot: formModel.extra.create_snapshot as boolean,
      },
      minimum_dns_ttl_s: formModel.minimum_dns_ttl_s as number,
      depth_first: formModel.depth_first as boolean,
      meta: {
        name: formModel.meta.name as string,
        description: formModel.meta.description as string,
        label: labelsDeepCopy

      }
    };
    return saveCrawlconfig;
  }

  setSelectedDropdown() {
    if (this.crawlconfig.browser_config_id !== "") {
      this.browserconfigService.getBrowserconfigs(this.crawlconfig.browser_config_id).map(browser_config => browser_config).forEach((value) => {
        value.forEach((key) => {
          this.selectedBrowserconfigItems.push({id: key.id, itemName: key.meta.name, description: key.meta.description})
        });
        this.crawlconfigForm.controls['browser_config_id'].setValue(this.selectedBrowserconfigItems);
      });
    }
    if (this.crawlconfig.politeness_id !== "") {
      this.politenessconfigService.getPolitenessconfig(this.crawlconfig.politeness_id).map(politeness => politeness).forEach((value) => {
        value.forEach((key) => {
          this.selectedPolitenessconfigItems.push({
            id: key.id,
            itemName: key.meta.name,
            description: key.meta.description
          })
        });
        this.crawlconfigForm.controls['politeness_id'].setValue(this.selectedPolitenessconfigItems);
      });
    }
  }

  filldropdown() {
    this.browserconfigService.getAllBrowserconfigs().map(browserconfigs => browserconfigs.value).forEach((value) => {
      value.forEach((key) => {
        this.browserconfigList.push({id: key.id, itemName: key.meta.name, description: key.meta.description})
      })
    });

    this.politenessconfigService.getAllPolitenessconfigs().map(politenessconfigs => politenessconfigs.value).forEach((value) => {
      value.forEach((key) => {
        this.politenessconfigList.push({id: key.id, itemName: key.meta.name, description: key.meta.description})
      })
    });

    this.dropdownPolitenessconfigSettings = {
      singleSelection: true,
      text: "Velg Politeness",
      enableSearchFilter: true
    };

    this.dropdownBrowserconfigSettings = {
      singleSelection: true,
      text: "Velg browserconfig",
      enableSearchFilter: true
    };
  }

  setLabel(label) {
    const labelFGs = label.map(label => (this.fb.group(label)));
    const labelFormArray = this.fb.array(labelFGs);
    this.crawlconfigForm.setControl('label', labelFormArray);
  }

  addLabel() {
    const control = <FormArray>this.crawlconfigForm.controls['label'];
    control.push(this.initLabel());
  }

  removeLabel(i: number) {
    const control = <FormArray>this.crawlconfigForm.controls['label'];
    control.removeAt(i);
  }

  get label(): FormArray {
    return this.crawlconfigForm.get('label') as FormArray;
  };

  initLabel() {
    return this.fb.group({
      key: ['', [Validators.required, Validators.minLength(2)]],
      value: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  revert() {
    this.ngOnChanges();
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Tilbakestilt',
      });
  }

}
